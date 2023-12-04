-- Returns the contents of a file.
local function read_file (path)
  local file = io.open(path, "rb")
  if not file then return nil end
  local contents = file:read "*a"
  file:close()
  return contents
end

-- Replaces the string "{{file.ext}}" with the contents of that temporary file.
-- It must be added as a metadata variable and used in the template.
function Inlines (inlines)
  for i, elem in pairs(inlines) do
    if elem.tag == "Str" and elem.text:match("^{{.*}}$") then
      local fileName = elem.text:match("^{{(.*)}}$")
      local fileContent = read_file("./tmp/" .. fileName)
      inlines[i] = pandoc.RawInline('html', fileContent)
    end
  end
  return inlines
end
