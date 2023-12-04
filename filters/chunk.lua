local base -- Base URL.

-- Loads the base URL into a variable.
function Meta (meta)
  if meta.base ~= nil then
    for k,v in pairs(meta.base) do
      base = v.text
    end
  else
    base = ""
  end
end

-- Appends the base URL to the HREF of the links with relative paths.
function Link (elem)
  if not elem.target:match("^.*://") then
    elem.target = base .. elem.target
  end
  return elem
end

-- Appends the base URL to the SRC of the images with relative paths.
function Image (elem)
  if not elem.src:match("^.*://") then
    elem.src = base .. elem.src
  end
  return elem
end

return {
  { Meta = Meta },
  { Link = Link },
  { Image = Image }
}
