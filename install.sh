#!/usr/bin/env bash

# This script is for end-users, and can be retrieved remotely and executed in
# isolation. It downloads a tarball of the release, runs the full installation
# process and adds `bin/markdown-pages` to the path. The target folder is
# `~/.local/bin`, or the path passed in the first parameter. For example,
# `install.sh .` uses the current directory.

# The version to download.
VER="0.1.0"
# The installation folder.
DIR="${$1:-~/.local/bin}/markdown-pages"

# Create the installation folder.
mkdir -p $DIR

# Download the release version.
curl -L \
  https://github.com/marcbperez/markdown-pages/archive/refs/tags/$VER.tar.gz \
  | tar zxvp -C $DIR

# Set execution permissions, in case they were not applied during decompression.
chmod +x \
  $DIR/markdown-pages-$VER/gradlew \
  $DIR/markdown-pages-$VER/bin/markdown-pages

# Install system dependencies.
echo "sudo is needed to install system dependencies."
sudo $DIR/markdown-pages-$VER/gradlew install

# Try to add permanently to the path.
if [ -f ~/.bashrc ]; then
  echo "export PATH=$DIR/markdown-pages-$VER/bin:\$PATH" \
    >> ~/.bashrc
else
  echo "Could not add to path, but it can be done manually with:"
  echo "export PATH=$DIR/markdown-pages-$VER/bin:\$PATH" \
fi
