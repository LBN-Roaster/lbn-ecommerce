"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast({
  title,
  description,
  learnMore,
}: {
  title: string;
  description: string;
  learnMore: string;
}) {
  useEffect(() => {
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast(title, {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            {description}{" "}
            <a
              href="https://lbn.com.vn/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              {learnMore}
            </a>
            .
          </>
        ),
      });
    }
  }, [title, description, learnMore]);

  return null;
}
