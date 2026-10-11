import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getArticleSeriesContext } from "@/lib/series";
import { SeriesContentsComponent } from "./series-contents-component";

describe("SeriesContentsComponent", () => {
  it("identifies the current article and links the published sequence", () => {
    const context = getArticleSeriesContext({
      slug: "2026-10-11-understanding-gpt2-tokenization",
      series: {
        name: "Notes From a Software Engineer Learning LLMs",
        slug: "software-engineer-learning-llms",
        order: 2,
      },
    });
    expect(context).toBeDefined();

    render(<SeriesContentsComponent context={context!} />);

    expect(screen.getByText("Current").closest("[aria-current]")).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: /GPT-2, One Token at a Time/ }),
    ).toHaveAttribute(
      "href",
      "/articles/2026-10-10-how-gpt2-predicts-one-token-at-a-time",
    );
    expect(
      screen.getByRole("link", {
        name: "View all published articles in this series",
      }),
    ).toHaveAttribute(
      "href",
      "/series/software-engineer-learning-llms",
    );
  });
});
