-- Checks if a file exists.
function file_exists(file)
  local f = io.open(file, "rb")
  if f then f:close() end
  return f ~= nil
end

-- Get all lines from a file, or return an empty table if it does not exist.
function lines_from(file)
  if not file_exists(file) then return {} end
  local lines = {}
  for line in io.lines(file) do
    lines[#lines + 1] = line
  end
  return lines
end

local base -- Base URL.
local files -- Markdown files that will be converted to HTML.
local rewrites -- Page rewrite aliases.

-- Loads the base URL into a variable, fills in the markdown files to be
-- converted and loads the rewrite alias list.
function Meta (meta)
  if meta.base ~= nil then
    for k,v in pairs(meta.base) do
      base = v.text
    end
  else
    base = ""
  end

  files = {}
  for file in io.popen([[ls *.md | grep -v " "]]):lines() do
    files[file] = true
  end

  rewrites = {}
  local lines = lines_from("./.rewrite")
  for k, line in pairs(lines) do
    if line:match(":") then
      local key, value = line:match("^(.*):(.*)$")
      rewrites[key] = value
    end
  end
end

-- Changes links pointing to converted Markdown resources to HTML. For example,
-- if the index page exists, a link to index.md will be converted to index.html.
function Link (elem)
  if not elem.target:match("^.*://") then
    local prefix = elem.target:match("^/") or "" -- Part before the file name.
    local suffix = elem.target:match("#.*$") or "" -- Part after the file name.
    local name = elem.target:gsub("^/", ""):gsub("#.*$", "")

    if files[name] ~= nil then
      name = name:gsub("%..*$", "") -- Remove the extension.
      name = rewrites[name] or name
      elem.target = prefix .. name .. ".html" .. suffix
    end
  end
  return elem
end

return {
  { Meta = Meta },
  { Link = Link }
}

