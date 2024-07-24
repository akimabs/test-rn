import { getBrandsImage, getBrandsLetter } from "@/app/api/request/brand";
import { useCallback, useMemo, useState } from "react";

export const useBrand = () => {
  const [visibleTabSelected, setVisibleTabSelected] = useState<string>("BRAND NAME");
  const [visibleLetterSelected, setVisibleLetterSelected] = useState<string>("A");
  const [query, setQuery] = useState<string>("");
  const [brandsLetterTemp, setBrandsLetterTemp] = useState<any[]>([]);

  const { data: dataBrandImage } = getBrandsImage.query({
    fields: "_id,name,slug,logo,featured_text",
    filter: JSON.stringify({ is_featured: true }),
    skip: 0,
    limit: 15,
    sort: "-featured_created_at",
  });

  const { data: dataBrandLetter } = getBrandsLetter.query(
    {
      fields: "name,logo,slug",
      limit: 100,
      sort: "name",
    },
    {
      onSuccess: (datakuy) => {
        const data = Object.keys(datakuy?.data || {}).map((letter) => ({
          letter,
          items: datakuy?.data[letter].filter((item) => Object.keys(item).length > 0),
        }));
        setBrandsLetterTemp(data);
      },
    }
  );

  const mappedDataLetter = useMemo(
    () =>
      Object.keys(dataBrandLetter?.data || {}).map((letter) => ({
        letter,
        items: dataBrandLetter?.data[letter].filter((item) => Object.keys(item).length > 0),
      })),
    [dataBrandLetter]
  );

  const dataTabContent = useMemo(() => ["BRAND NAME", "BRAND ORIGINS"], []);

  const _handleTogleSelectedBrandName = useCallback(() => setVisibleTabSelected("BRAND NAME"), [visibleTabSelected]);
  const _handleTogleSelectedBrandOrigins = useCallback(() => setVisibleTabSelected("BRAND ORIGINS"), [visibleTabSelected]);
  const _handleTogleSelectedLetter = useCallback((value: string) => setVisibleLetterSelected(value), [visibleLetterSelected]);

  const _handleSearch = (str: string) => {
    setQuery(str);
    // TODO update search
  };
  return {
    dataBrandImage,
    visibleTabSelected,
    dataTabContent,
    mappedDataLetter,
    visibleLetterSelected,
    brandsLetterTemp,
    query,
    _handleSearch,
    _handleTogleSelectedBrandName,
    _handleTogleSelectedBrandOrigins,
    _handleTogleSelectedLetter,
  };
};
