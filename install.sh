#!/usr/bin/env bash

# This script is for end-users, and can be retrieved remotely and executed in
# isolation. It downloads a tarball of the release, runs the full installation
# process and adds `bin/markdown-pages` to the path. The target folder is
# `~/.local/bin`, or the path passed in the first parameter. For example,
# `install.sh .` uses the current directory.

# The version to download.
VER="0.12.0"
# The installation folder.
DIR="${1:-"$HOME/.local/bin"}"
# The folder where the downloaded version will be extracted.
EXTRACTED="$DIR/markdown-pages-$VER"

# Create the installation folder.
mkdir -p $DIR

# Download the release version.
curl -L \
  https://github.com/marcbperez/markdown-pages/archive/refs/tags/$VER.tar.gz \
  | tar zxvp -C $DIR

# Set execution permissions, in case they were not applied during decompression.
chmod +x $EXTRACTED/gradlew $EXTRACTED/bin/markdown-pages

# Install system dependencies.
echo "sudo is needed to install system dependencies."
sudo $EXTRACTED/gradlew --project-dir=$EXTRACTED install

# Restore user and group after sudo commands.
sudo chown -R $USER:$USER $EXTRACTED

# Try to add `markdown-pages` to the path permanently by creating a symbolic
# link in `$HOME/.local/bin`, which should already be in the path.
case :$PATH:
  in *:$HOME/.local/bin:*)
    ln -sf $EXTRACTED/bin/markdown-pages $HOME/.local/bin/markdown-pages
  ;;
  *)
    echo "Could not add to the path, but it can be done manually with:"
    echo "PATH=$EXTRACTED/bin:\$PATH"
  ;;
esac
