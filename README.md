# markdown-pages

A Static Site Generator for Markdown powered by Gradle, Pandoc, Spock, Preact
and a minimalistic template.

## Installation

Clone the sources in Debian with Java 18 or newer and install the project
dependencies. Information on how to install Java can be found in the
[official documentation][install-java].

```bash
git clone https://github.com/marcbperez/markdown-pages
cd markdown-pages
sudo ./gradlew install
```

For end users, `install.sh` downloads a tarball of the release, runs the full 
installation process and adds `bin/markdown-pages` to the path.

## Usage

For continuous integration and development use the Gradle wrapper. Without
parameters, it will build the project into the `docs` folder and run tests. The
`serve` task will use the build folder to start a development server at
[http://localhost:8000][dev-server].

```bash
./gradlew
./gradlew serve
```

For a continuous build use `./gradlew --continuous`. For a full list of tasks,
see `./gradlew tasks --all`. Without the wrapper use Gradle directly. This will
create it in case it is not present. The equivalent commands use `gradle`
instead of `./gradlew`. Information on how to install Gradle can be found in the
[official documentation](install-gradle).

The `bin/markdown-pages` script runs a continuous build and serves the results
at the same time using the wrapper. It can replace the commands described above
and works from any directory.

```bash
export PATH=$(pwd)/bin:$PATH
mkdir ~/my-site
cd ~/my-site
echo "# Home" > index.md
markdown-pages
```

## Testing

Test checks are executed automatically every time the project is built. To run 
them manually use the `./gradlew test` command. It will execute all the Spock
tests from the `test` folder whose names match `test/**/*Spec.groovy`.

## Deployment

The generated site can be deployed to any HTTP server by uploading the `docs` 
folder and using it as the public directory.

## Troubleshooting

The [issue tracker][issue-tracker] intends to manage and compile bugs,
enhancements, proposals and tasks. Reading through its material or reporting to
its contributors via the platform is strongly recommended.

## Contributing

This project adheres to [Semantic Versioning][semver] and to certain syntax
conventions defined in [.editorconfig][editorconfig]. To get a list of changes
refer to the [CHANGELOG][changelog]. Only branches prefixed by *feature-*,
*hotfix-*, or *release-* will be considered:

  - Fork the project.
  - Create your new branch: `git checkout -b feature-my-feature develop`
  - Commit your changes: `git commit -am 'Added my new feature.'`
  - Push the branch: `git push origin feature-my-feature`
  - Submit a pull request.

## Credits

This project was created by [Marc B. Perez][author] and maintained by its
[author][author] and contributors.

## License

This project is licensed under the [Apache License Version 2.0][license].

[author]: https://marcbperez.github.io
[issue-tracker]: https://github.com/marcbperez/markdown-pages/issues
[editorconfig]: /.editorconfig
[changelog]: /CHANGELOG.md
[license]: /LICENSE
[semver]: http://semver.org
[install-gradle]: https://gradle.org/install
[install-java]: https://wiki.debian.org/Java#Quick_Install_Guide
[markdown-pages]: https://github.com/marcbperez/markdown-pages
[dev-server]: http://localhost:8000
