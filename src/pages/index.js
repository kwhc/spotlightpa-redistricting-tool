import * as React from "react"
import {useState, useEffect} from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import Autocomplete from "react-google-autocomplete"

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

function SetMapCenter({coords}){
  const map = useMap()
  map.setView(coords, map.getZoom())
  console.log('SetMapCenter hit: ' + coords)
  return null
}

const IndexPage = ({data}) => {
  const allDistricts = data.allGeoFeature.edges.map(
    edge => edge.node
  )

  const harrisburgLatLng = [40.2644886,-76.8837162]
  const [position, setPosition] = useState(harrisburgLatLng)

  return (
  <Layout>
    <Seo title="Home" />
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <p>
            <Link to="/page-2/">Go to page 2</Link> <br />
          </p>
          <StaticImage
            src="../images/gatsby-astronaut.png"
            width={300}
            quality={95}
            formats={["auto", "webp", "avif"]}
            alt="Spotlight PA"
            style={{ marginBottom: `1.45rem` }}
          />

          <h1 className="text-center mb-5">
            Pennsylvania has new political maps. See which districts your home is in.
          </h1>

        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <span className="text-uppercase fw-bold">Enter your address</span>
          <div className="mb-4">
            <Autocomplete
              apiKey="AIzaSyCkikgbpIdj1MmGfFIpYh64ZS4_AX9SkUg"
              onPlaceSelected={(place) => {
                console.log("Place selected: " + place.geometry.location.lat() + " " + place.geometry.location.lng())
                setPosition([place.geometry.location.lat(), place.geometry.location.lng()])
              }}
              options={{
                types: ["address"],
                componentRestrictions: { country: "us"},
              }}
              defaultValue="Harrisburg, PA"
              className="form-control"
            />
          </div>

          <MapContainer
            key="TKTK"
            center={position}
            zoom={12}
            scrollWheelZoom={false}
            style={{height:`492px`}}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <SetMapCenter coords = {position} />
          </MapContainer>

          <div>
            Position: {position}
          </div>

        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="district__container mb-3">
            <div className="mb-3">
              <div className="text-uppercase text-center fw-bold">Previously</div>
              <div className="display-6 text-center fw-bold mb-3">District TK</div>
              <p className="mb-4">
              Sed euismod, metus a pulvinar volutpat, elit tellus vulputate elit, ac lacinia augue ex ut augue. Proin et lacinia risus, et facilisis tortor. Sed interdum tempus venenatis. Proin scelerisque arcu gravida urna aliquet pretium.
              </p>
              <p>Among eligible voters, this distric has:</p>
              <div className="fw-bold">A TK majority</div>
            </div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height:`492px`}}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <SetMapCenter coords = {position} />
            </MapContainer>
          </div>
        </div>
        <div className="col">
          <div className="district__container mb-3">
            <div className="mb-3">
              <div className="text-uppercase text-center fw-bold">Now</div>
              <div className="display-6 text-center fw-bold mb-3">District TK</div>
              <p className="mb-4">
              Nullam vitae odio in risus interdum laoreet. Vivamus at ligula a enim efficitur faucibus at pellentesque eros. Donec faucibus sem a nulla consequat hendrerit. Proin ullamcorper finibus vulputate. Morbi sed tincidunt purus.
              </p>
              <p>Among eligible voters, this distric has:</p>
              <div className="fw-bold">A TK majority</div>
            </div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height:`492px`}}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              <SetMapCenter coords = {position} />
            </MapContainer>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <ul>
            {allDistricts.map((district) => (
              <li> {district.featureFields.District_N} </li>
            ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  </Layout>
)
}

export const query = graphql`
query{
  allGeoFeature {
    edges {
      node {
        id
        geometry {
          centroid {
            x
            y
          }
          envelope {
            minX
            minY
            maxX
            maxY
          }
        }
        featureFields {
          OBJECTID
          District_N
          District_1
          Area
          Perimeter
          Compactnes
          Population
          Voting_Age
          Analysis1
          Analysis2
          Analysis3
          RGB
          CountySpli
          PrecinctSp
          RemainingB
          TotalBlock
          Locked
          LockedBy
          Labelvalue
          OriginLaye
          OriginSTFI
          OriginLa_1
          TIMEDATE
          SID
          SHAPE_Leng
          SHAPE_Area
        }
      }
    }
  }
}
`

export default IndexPage
