import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  tone?: keyof typeof mutedText;
};

// Secondary text colour for each background the heading can sit on.
const mutedText = {
  page: "text-fg-muted",
  tint: "text-tint-fg-muted",
  inverse: "text-inverse-fg-muted",
};

export function SectionHeading({ title, description, action, tone = "page" }: Props) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 data-reveal="heading" className="font-serif text-title font-medium lining-nums text-balance lg:text-title-lg">
          {title}
        </h2>
        {description && (
          <p data-reveal="item" className={`mt-4 text-lead text-pretty ${mutedText[tone]}`}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <div data-reveal="item" className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
