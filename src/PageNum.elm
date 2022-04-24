module PageNum exposing (PageNum, first, minus1, plus1)


type PageNum
    = PageNum Int


first : PageNum
first =
    PageNum 0


{-| There is nothing special about this number. All it needs to be is
less than integer overflow and more than there will be pages.
-}
maxPageNum : Int
maxPageNum =
    1000000


plus1 : PageNum -> Result String PageNum
plus1 (PageNum p) =
    if p == maxPageNum then
        Err "maximum page number reached"

    else
        Ok (PageNum (p + 1))


minus1 : PageNum -> Result String PageNum
minus1 (PageNum p) =
    if p == 0 then
        Err "minimum page number reached"

    else
        Ok (PageNum (p - 1))
