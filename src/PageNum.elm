module PageNum exposing
    ( PageNum
    , empty
    , first
    , isFirstPage
    , isLastPage
    , minus1
    , pageNum
    , plus1
    , totalPages
    )


type PageNum
    = PageNum
        { pageNum : Int
        , totalPages : Int
        }


empty : PageNum
empty =
    PageNum { pageNum = 0, totalPages = 0 }


totalPages : PageNum -> Int
totalPages (PageNum p) =
    p.totalPages


pageNum : PageNum -> Int
pageNum (PageNum p) =
    p.pageNum + 1


first : Int -> Result String PageNum
first n =
    if n < 0 then
        Err "can't have negative page numbers"

    else
        Ok (PageNum { pageNum = 0, totalPages = n })


isFirstPage : PageNum -> Bool
isFirstPage (PageNum p) =
    p.pageNum == 0


isLastPage : PageNum -> Bool
isLastPage (PageNum p) =
    p.pageNum + 1 == p.totalPages


plus1 : PageNum -> Result String PageNum
plus1 (PageNum p) =
    if p.pageNum + 1 == p.totalPages then
        Err "maximum page number reached"

    else
        Ok (PageNum { p | pageNum = p.pageNum + 1 })


minus1 : PageNum -> Result String PageNum
minus1 (PageNum p) =
    if p.pageNum == 0 then
        Err "minimum page number reached"

    else
        Ok (PageNum { p | pageNum = p.pageNum - 1 })
