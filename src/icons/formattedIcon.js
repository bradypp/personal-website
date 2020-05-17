import React from "react"
import PropTypes from "prop-types"
import {
  IconAppStore,
  IconCodepen,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconLocation,
  IconLogo,
  IconStar,
  IconTwitter,
  IconZap,
} from "@components/icons"

const FormattedIcon = ({ name }) => {
  switch (name) {
    case "AppStore":
      return <IconAppStore />
    case "Codepen":
      return <IconCodepen />
    case "Folder":
      return <IconFolder />
    case "Fork":
      return <IconFork />
    case "GitHub":
      return <IconGitHub />
    case "Instagram":
      return <IconInstagram />
    case "Linkedin":
      return <IconLinkedin />
    case "Loader":
      return <IconLoader />
    case "Location":
      return <IconLocation />
    case "Logo":
      return <IconLogo />
    case "Star":
      return <IconStar />
    case "Twitter":
      return <IconTwitter />
    case "Zap":
      return <IconZap />
    case "External":
    default:
      return <IconExternal />
  }
}

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default FormattedIcon
