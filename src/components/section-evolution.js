import React from "react"
import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"

import Section from "./section"
import Image from "./image"

const SectionEvolution = ({ num, title, id }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    customPaging: index => {
      return <a>{index + 1}</a>
    },
    dots: true,
    fade: true,
    focusOnChange: true,
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <Section id={id} sectionTitle={`${num}. ${title}`}>
      <p>
        From our research into JaaS providers and our own experience building
        Jade core, we identified several challenges that developers might face
        and sought to overcome them. This section introduces the following
        challenges and how we sought to overcome them:
      </p>
      <ul className="bullets">
        <li className="list-item">Supporting multiple developers</li>
        <li className="list-item">Launching multiple Jade apps</li>
        <li className="list-item">Docker for build dependencies</li>
        <li className="list-item">Atomic deploys</li>
        <li className="list-item">Staging previews</li>
        <li className="list-item">Versioning</li>
      </ul>
      <h3 id={`subtitle-${num}-1`} data-title={`Subtitle ${num}-1`}>
        {`${num}.1 Multiple developers`}
      </h3>
      <p>
        The core architecture allows a single developer to be in charge of the
        provisioned AWS infrastructure. What if a team of developers, for
        example Alice and Bob, are eager to work on a JAMstack site together?
      </p>
      <Image imageAlt="multi-user one user succeed" imageName="svgs/57.svg" />
      <p>
        At present, Bob does not have the necessary credentials and files to run
        the Jade command. As a result, his command fails to interact with
        Alice’s AWS infrastructure.
      </p>
      <p>
        One option available is for them to share credentials and config files.
        This may work but is largely an insecure and error-prone approach, given
        that files may be corrupted or missing due to errors during the sharing
        process.
      </p>
      <Image imageAlt="multi-user add user fail" imageName="svgs/58.svg" />
      <p>
        To overcome this, the Jade framework creates a Jade IAM group with all
        the permissions needed. The primary developer then adds secondary
        developers to this group, and now all team members will be able to
        perform the commands they need.
      </p>
      <Slider {...settings}>
        <div>
          <Image imageAlt="multi-user iam group" imageName="svgs/59.svg" />
        </div>
        <div>
          <Image
            imageAlt="multi-user successful commands"
            imageName="svgs/60.svg"
          />
        </div>
      </Slider>

      <h3 id={`subtitle-${num}-2`} data-title={`Subtitle ${num}-2`}>
        {`${num}.2 Multiple Jade apps`}
      </h3>
      <p>
        A team of developers may want to create multiple Jade applications. To
        understand what problems this may cause, let us closely examine the
        memory usage of a single EC2 instance:
      </p>
      <Image imageAlt="single app memory okay" imageName="svgs/61.svg" />
      <p>
        At present, there is sufficient memory to handle a single application.
        EC2 will store the build environment, source code, and other artifacts
        related to this app, which amounts to nearly 1GB of data that is kept on
        EC2 even for the simplest of sites.
      </p>
      <p>
        If a developer adds a second app, the amount of memory used may exceed
        the EC2 capacity. In addition, having multiple build servers on one app
        makes it difficult to identify the relevant build server and config
        files for each app.
      </p>
      <Image imageAlt="multiple apps memory fail" imageName="svgs/62.svg" />
      <p>
        To overcome this, a developer may choose to vertically scale their EC2
        server by upgrading to one with more memory. However, after starting a
        certain number of Jade apps, the server will again face memory
        constraints.
      </p>
      <p>
        As such, when developers launch a new app, Jade instead provisions a
        dedicated EC2 server.
      </p>
      <Image imageAlt="two apps on two servers" imageName="svgs/64.svg" />
      <p>
        This not only reduces the likelihood of memory issues but also allows
        developers to save costs by freezing their servers when not working on a
        particular app. When they would like to make an edit, they can unfreeze
        it and continue to develop their site.
      </p>
      <Slider {...settings}>
        <div>
          <Image imageAlt="freezing an app" imageName="svgs/65.svg" />
        </div>
        <div>
          <Image imageAlt="unfreezing an app" imageName="svgs/66.svg" />
        </div>
      </Slider>
      <p>
        Note that developers who make use of this functionality will have to
        update their GitHub webhook with the new IP address. To facilitate this,
        developers can run <code>jade list</code> in the console to see the
        latest IP addresses of their EC2 instances.
      </p>

      <h3 id={`subtitle-${num}-3`} data-title={`Subtitle ${num}-3`}>
        {`${num}.3 Docker for build dependencies`}
      </h3>
      <p>
        In Jade core, developers have to use the version of Node installed in
        EC2 to build their files. This may be problematic if, say, their web app
        depends on an older version of Node, which could cause dependency errors
        or extended build times. Here is an illustrative example of what could
        happen:
      </p>
      <Image
        imageAlt="dependency error with different versions"
        imageName="svgs/67.svg"
      />
      <p>
        To overcome this, we implemented Docker within EC2 to store build
        environments and other user configurations. To support Docker, Jade had
        to be refactored in certain ways. We wrote a Dockerfile that specified
        the environment settings for a new Docker image. We also set up a folder
        in EC2 for Docker to build and send files to. Finally, instead of
        invoking the build directly in EC2, we created a new Node file to manage
        Docker, giving us direct control over the build process. These changes
        allowed us to largely preserve our existing method of interacting with
        other AWS services, notably S3 and DynamoDB.
      </p>
      <Image
        imageAlt="docker stores build dependencies"
        imageName="svgs/68.svg"
      />
      <p>
        As of now, Jade’s default Docker setup allows a user to build and deploy
        Gatsby applications. If desired, developers can edit the{" "}
        <code>Dockerfile</code> in order to choose which version of Node they
        want to use. If more configuration for builds is needed, the{" "}
        <code>dockerBuild.js</code> file can be edited as well. The purpose here
        is to keep Node environments separate from the EC2 Node version,
        therefore eliminating any dependency concerns.
      </p>

      <h3 id={`subtitle-${num}-4`} data-title={`Subtitle ${num}-4`}>
        {`${num}.4 Atomic deploys`}
      </h3>
      <p>
        As part of The JAMstack Way, developers expect that each deploy is
        atomic and self-contained. This means that they can view a previous
        build without having to worry that the state of the source code and data
        used to build the files has changed. Instead, the static files of older
        versions can be viewed and analyzed in their entirety.
      </p>
      <p>
        In Jade core, when a developer pushes a new commit, the automatically
        built files actually override previously built files. As a result, the
        user is unable to view previous deploys as desired.
      </p>
      <Image imageAlt="override previous build fail" imageName="svgs/70.svg" />
      <p>
        To introduce atomic deploys, Jade utilizes a new bucket to store all
        historical builds. Doing so lets developers keep track of all builds
        that have taken place. Each time a build is made, a zip file is sent to
        the historical builds bucket in addition to the unzipped files being
        sent to the live bucket. This allows the developer to log into S3 to
        download and view a historical build.
      </p>
      <Image
        imageAlt="live and historical build buckets"
        imageName="svgs/71.svg"
      />

      <h3 id={`subtitle-${num}-5`} data-title={`Subtitle ${num}-5`}>
        {`${num}.5 Staging previews`}
      </h3>
      <p>
        As newly built files are automatically distributed to the CDN,
        developers are not able to preview their sites before it goes live. This
        means that issues with the site are not caught before they are
        distributed to end users.
      </p>
      <Image imageAlt="errors are distributed to CDN" imageName="svgs/73.svg" />
      <p>
        To allow developers to view their site, we introduce the use of a{" "}
        <code>staging</code> branch where developers can view their website
        before it gets distributed to the CDN. Developers can use the Git
        command <code>git push origin staging</code>, preview their site, and
        then use the command <code>git push origin master</code> once they are
        satisfied with the site.
      </p>
      <Image
        imageAlt="staging branch enables previews"
        imageName="svgs/74.svg"
      />

      <h3 id={`subtitle-${num}-6`} data-title={`Subtitle ${num}-6`}>
        {`${num}.6 Versioning`}
      </h3>
      <p>
        With these features, developers have to use the AWS console to manage
        their built files, particularly to preview historical builds and the
        staging build. This may become complicated and requires developers to be
        careful about which build they are downloading and viewing.
      </p>
      <Image imageAlt="aws console is complex" imageName="svgs/75.svg" />
      <p>
        To facilitate ease of use, users can simply use the{" "}
        <code>jade admin</code> command to spin up an admin panel. This admin
        panel uses an Express.js server coupled with React on the frontend to
        generate a dashboard for users.
      </p>
      <Image imageAlt="admin panel" imageName="svgs/77.svg" />
      <p>
        The admin panel provides key information about all the Jade apps that
        the developer is running. Developers are provided with a link to their
        production site, staging site, and downloads for historical builds.
        Developers can also view the EC2 IP address should they need to adjust
        the GitHub webhook or SSH into EC2.
      </p>

      <h3 id={`subtitle-${num}-7`} data-title={`Subtitle ${num}-7`}>
        {`${num}.7 Final architecture`}
      </h3>
      <p>
        To demonstrate how Jade has evolved, here is a review of the core
        functionality that many JaaS providers offer:
      </p>
      <Image imageAlt="jaas provider review" imageName="svgs/35.svg" />

      <p>
        With Jade features added to this functionality, our final architecture
        looks like this:
      </p>
      <Image imageAlt="jade final architecture" imageName="svgs/79.svg" />
    </Section>
  )
}

export default SectionEvolution
