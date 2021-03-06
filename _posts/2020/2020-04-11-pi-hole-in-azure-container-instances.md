---
date: 2020/04/11 14:34:35 +05:30
title: "Pi-hole in Azure Container Instances"
layout: post
disqus: true
tags:
  - azure
  - azure-container-instance
  - pi-hole
categories:
  - self-hosting
---

A simple guide to deploy [Pi-hole](https://pi-hole.net/), a black hole for Internet advertisements, in [Azure Container Instances](https://azure.microsoft.com/en-in/services/container-instances/).

- We use pi-hole's docker image.
- We persist configurations and data across the container instances. To do so, we will use Azure Storage to mount file volumes in the containers.

1\. Install [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest) and set your subscription

```
> az login

> az account set --subscription <subscription_id>
```

2\. Create a Resource Group

```
> az group create --name <rg_name> --location <location>
```

3\. Create a Storage account

```
> az storage account create --resource-group <rg_name> --name <storage_name> --location <location> --sku Standard_LRS
```

4\. Create two file shares in the storage account created in the last step

```
az storage share create --account-name <storage_name> --name etc-pihole

az storage share create --account-name <storage_name> --name etc-dnsmasq
```

5\. Obtain the storage account key

```
STORAGE_KEY=$(az storage account keys list --resource-group <rg_name> --account-name <storage_name> --query "[0].value" --output tsv)
```

5\. Since our container will require a good number of configuration, let's use a yaml file

deploy-pi-hole.yaml

```
name: <container_group_name>
apiVersion: '2018-10-01'
location: <location>
tags: {}
properties:
  containers:
  - name: <container_name>
    properties:
      image: pihole/pihole:latest
      ports:
      - protocol: UDP
        port: 53
      - protocol: UDP
        port: 67
      - protocol: TCP
        port: 80
      - protocol: TCP
        port: 443
      environmentVariables:
      - name: TZ
        value: Asia/Kolkata
      - name: WEBPASSWORD
        value: <custom_large_string>
      resources:
        requests:
          memoryInGB: 1
          cpu: 1
      volumeMounts:
      - name: pihole
        mountPath: /etc/pihole/
        readOnly: false
      - name: dnsmasq
        mountPath: /etc/dnsmasq.d/
        readOnly: false
  restartPolicy: Always
  ipAddress:
    ports:
    - protocol: UDP
      port: 53
    - protocol: UDP
      port: 67
    - protocol: TCP
      port: 80
    - protocol: TCP
      port: 443
    type: public
    dnsNameLabel: <custom_dnsname>
  osType: Linux
  volumes:
  - name: pihole
    azureFile:
      shareName: etc-pihole
      readOnly: false
      storageAccountName: <storage_name>
      storageAccountKey: <value of $STORAGE_KEY>
  - name: dnsmasq
    azureFile:
      shareName: etc-dnsmasq
      readOnly: false
      storageAccountName: <storage_name>
      storageAccountKey: <value of $STORAGE_KEY>
```

Replace the place holders in the yaml file.

- <custom_large_string> will be used as the password when you log in to pi-hole's dashboard.
- <custom_dnsname> will be used in the generated FQDN in the following format `<custom_dnsname>.<location>.azurecontainer.io`

6\. Create the container instance

```
az container create --resource-group <rg_name> --file deploy-pi-hole.yaml
```

7\. Get the IP address of the pi-hole running as container instance.

```
az container show --resource-group <rg_name> --name <container_group_name> --query ipAddress.ip --output tsv
```

**Update**: It has been 10 days since I started using pi-hole and it has blocked ~31% of my DNS queries so far.

![Pi-hold stats]({{ site.url }}/images/2020-04-11-pi-hole-in-azure-container-instances/stats.png)
