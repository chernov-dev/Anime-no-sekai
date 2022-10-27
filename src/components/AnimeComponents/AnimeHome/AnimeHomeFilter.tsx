import { Tab } from '@headlessui/react'

const AnimeHomeFilter = () => {
  return (
    <div>
      <Tab.List className="flex neumorphic-tab__list py-1.5">
        <Tab>All</Tab>
        <Tab>TV</Tab>
        <Tab>ONA</Tab>
        <Tab>OVA</Tab>
        <Tab>MOVIE</Tab>
      </Tab.List>
    </div>
  )
}

export default AnimeHomeFilter