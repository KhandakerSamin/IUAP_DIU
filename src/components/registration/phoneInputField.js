"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { COUNTRIES } from "@/lib/countries";

function CountryFlag({ iso2, name = "", className = "w-6 h-4.5" }) {
  if (!iso2) return null;
  const code = iso2.toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={24}
      height={16}
      alt={name ? `${name} flag` : iso2}
      className={`rounded-xs object-cover shadow-xs inline-block shrink-0 border border-slate-200/80 ${className}`}
      loading="lazy"
    />
  );
}

export default function PhoneInputField({
  countryIso2 = "bd",
  countryCode = "+880",
  phoneValue = "",
  onCountryChange,
  onPhoneChange,
  maxLength = 24,
  id = "phone",
  name = "phone",
  placeholder = "Phone number",
  required = true,
  error = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Find active country or fallback to first matching iso2 / default
  const selectedCountry = useMemo(() => {
    const targetIso = (countryIso2 || "bd").toLowerCase();
    const found = COUNTRIES.find((c) => c.iso2 === targetIso);
    if (found) return found;
    const foundByDial = COUNTRIES.find((c) => c.dialCode === countryCode);
    return foundByDial || COUNTRIES[0];
  }, [countryIso2, countryCode]);

  // Filter countries based on search term (name, iso2, or dialCode)
  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    const cleanQ = q.replace("+", "");
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.dialCode.replace("+", "").includes(cleanQ)
    );
  }, [search]);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        phoneInputRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Auto-focus search input when opened
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen]);

  const handleSelectCountry = (country) => {
    onCountryChange?.({
      iso2: country.iso2,
      dialCode: country.dialCode,
    });
    setIsOpen(false);
    setSearch("");
    // Automatically focus phone input so user can type immediately
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 50);
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    // Allow digits, dashes, spaces, parentheses
    const sanitized = raw.replace(/[^0-9()\-\s]/g, "").slice(0, maxLength);
    onPhoneChange?.(sanitized);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`flex items-stretch w-full rounded-xl border bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 ${
          error
            ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-100"
            : "border-slate-300 focus-within:border-primary"
        }`}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          id={`${id}-country-btn`}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setSearch("");
          }}
          className="flex items-center gap-2.5 px-3.5 sm:px-4 py-3 bg-slate-50 hover:bg-slate-100 active:bg-slate-200/80 border-r border-slate-200 rounded-l-xl transition select-none cursor-pointer shrink-0 min-w-[120px] sm:min-w-[135px] justify-between group"
          title={`Selected country: ${selectedCountry.name} (${selectedCountry.dialCode})`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <CountryFlag
              iso2={selectedCountry.iso2}
              name={selectedCountry.name}
              className="w-6 h-4.5 rounded-xs"
            />
            <span className="text-sm font-semibold text-slate-800 tracking-tight font-mono">
              {selectedCountry.dialCode}
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Direct Phone Number Input */}
        <input
          ref={phoneInputRef}
          id={id}
          name={name}
          type="tel"
          value={phoneValue}
          onChange={handleInputChange}
          maxLength={maxLength}
          required={required}
          autoComplete="tel-national"
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3 text-slate-900 text-sm font-medium outline-none placeholder:text-slate-400 placeholder:font-normal"
        />
      </div>

      {/* Country Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-80 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Box */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/90 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code (e.g. +46, Sweden)..."
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-xs text-slate-400 hover:text-slate-600 px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* List of Countries */}
          <div className="overflow-y-auto divide-y divide-slate-50 flex-1 overscroll-contain">
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-xs sm:text-sm text-slate-500">
                No matching country found.
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected =
                  c.iso2 === selectedCountry.iso2 && c.dialCode === selectedCountry.dialCode;
                return (
                  <button
                    key={`${c.iso2}-${c.dialCode}`}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-start hover:bg-slate-50 active:bg-slate-100 transition cursor-pointer ${
                      isSelected ? "bg-primary/5 font-semibold text-primary" : "text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <CountryFlag iso2={c.iso2} name={c.name} className="w-5.5 h-4 rounded-xs" />
                      <span className="text-xs sm:text-sm truncate font-medium text-slate-800">
                        {c.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                        {c.dialCode}
                      </span>
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-primary shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
