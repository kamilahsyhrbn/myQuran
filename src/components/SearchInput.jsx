import React, { useState, useEffect } from "react";
import { IoIosClose, IoMdArrowDropdown } from "react-icons/io";
import { Combobox } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getSurah } from "../redux/actions/quranActions";
import { useNavigate } from "react-router-dom";

export default function SearchInput({
  value,
  placeholder,
  onChange,
  className,
}) {
  const [query, setQuery] = useState("");
  const [selectedSurah, setSelectedSurah] = useState(null);
  const { quran } = useSelector((state) => state.quran);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const selected = quran.find((surat) => surat?.nomor === value);
    setSelectedSurah(selected || null);
    setQuery(selected ? `${selected.namaLatin}` : "");
  }, [value, quran]);

  const handleSelect = (surat) => {
    setSelectedSurah(surat);
    setQuery(surat ? `${surat.namaLatin}` : "");
    onChange(surat);
    dispatch(getSurah(surat?.nomor));
    navigate(`/baca-surat/${surat.nomor}`);
  };

  const filteredItems =
    query === ""
      ? quran
      : quran.filter((surat) =>
          surat?.namaLatin.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      <Combobox as="div" value={value} onChange={handleSelect}>
        <div className="relative mt-1">
          <Combobox.Input
            className={className}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder={placeholder}
          />

          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <IoMdArrowDropdown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredItems.length > 0 && (
            <Combobox.Options
              className={`absolute z-[9999999999999] mt-1 max-h-60 w-full overflow-auto no-scrollbar rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
            >
              {filteredItems.map((surat) => (
                <Combobox.Option
                  key={surat.nomor}
                  value={surat}
                  className={({ active }) =>
                    `cursor-pointer select-none relative py-2 pl-3 pr-9
                    ${active ? "text-white bg-primary" : "text-gray-900"}`
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected && "font-semibold"
                        }`}
                      >
                        {surat.namaLatin}
                      </span>
                      {selected && (
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-4
                          ${active ? "text-white" : "text-primary"}`}
                        ></span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
}
