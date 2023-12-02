/* groovylint-disable CompileStatic, JavaIoPackageAccess, NoWildcardImports */
/* groovylint-disable MethodName, FactoryMethodName, MethodReturnTypeRequired */
/* groovylint-disable ClassJavadoc, JUnitPublicNonTestMethod */

import spock.lang.*

class BuildEnvironmentSpec extends Specification {

    def 'build.gradle exists'() {
    expect:
      new File('build.gradle').exists()
    }

}
