/* groovylint-disable CompileStatic, JavaIoPackageAccess, NoWildcardImports */
/* groovylint-disable MethodName, FactoryMethodName, MethodReturnTypeRequired */
/* groovylint-disable ClassJavadoc, JUnitPublicNonTestMethod */

import spock.lang.*

class WebPagesSpec extends Specification {

    def 'at least the index source should exist'() {
    expect:
        new File('index.md').exists()
    }

    def 'at least the index output should exist'() {
    expect:
        new File('docs/index.html').exists()
    }

    def 'the sitemap source should exist'() {
    expect:
        new File('metadata/sitemap.yaml').exists()
    }

    def 'the sitemap output should exist'() {
    expect:
        new File('docs/sitemap.xml').exists()
    }

    def 'the feed source should exist'() {
    expect:
        new File('metadata/rss.yaml').exists()
    }

    def 'the feed output should exist'() {
    expect:
        new File('docs/rss.xml').exists()
    }

}
