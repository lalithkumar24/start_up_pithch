"use client";

import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <Link href="/" className="search-btn text-white">
      <button type="reset" onClick={reset}>
        <X className="size-5" />
      </button>
    </Link>
  );
};

export default SearchFormReset;
