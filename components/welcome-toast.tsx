"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("Chào mừng đến với LBN!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            Chuyên sản xuất máy rang cà phê & thiết bị công nghiệp chất lượng
            cao tại Khánh Hòa.{" "}
            <a
              href="https://lbn.com.vn/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Tìm hiểu thêm
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
