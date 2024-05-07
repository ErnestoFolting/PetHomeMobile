import { useMemo } from "react";

export const usePagination = (pagesCount) => {
    const result = useMemo(() => {
        let array = []
        for (let i = 0; i < pagesCount; i++) {
            array.push(i + 1)
        }
        return array
    }, [pagesCount])
    return [result]
}
