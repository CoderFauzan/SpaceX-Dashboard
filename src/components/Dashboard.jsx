import { useEffect, useState } from "react";
import axios from "axios";
import { FaWikipediaW, FaYoutube, FaReddit } from "react-icons/fa";
import { SiApacherocketmq } from "react-icons/si";

const Dashboard = () => {
  const [upcomingLaunches, setUpcomingLaunches] = useState([]);
  const [previousLaunches, setPreviousLaunches] = useState([]);
  const [launchPads, setLaunchPads] = useState([]);
  const [starlinks, setStarlinks] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/launches/upcoming")
      .then((response) => setUpcomingLaunches(response.data.slice(0, 4)))
      .catch((error) =>
        console.error("Error fetching upcoming launches:", error)
      );

    axios
      .get("https://api.spacexdata.com/v4/launches/past")
      .then((response) => setPreviousLaunches(response.data.slice(-4)))
      .catch((error) =>
        console.error("Error fetching previous launches:", error)
      );

    axios
      .get("https://api.spacexdata.com/v4/launchpads")
      .then((response) => setLaunchPads(response.data))
      .catch((error) => console.error("Error fetching launchpads:", error));

    axios
      .get("https://api.spacexdata.com/v4/starlink")
      .then((response) => setStarlinks(response.data.slice(0, 5)))
      .catch((error) => console.error("Error fetching starlink data:", error));
  }, []);

  // console.log(starlinks,launchPads);
  const launchCard = (launch) => (
    <div
      key={launch.id}
      className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mb-6"
    >
      <h3 className="text-2xl font-bold text-center mb-2">{launch.name}</h3>
      <div className="flex">
        <div className="w-2/3">
          <p className="mb-1">
            <strong>Rocket:</strong> {launch.rocket}
          </p>
          <p className="mb-1">
            <strong>Flight Number:</strong> {launch.flight_number}
          </p>
          <p className="mb-1">
            <strong>Time:</strong> {new Date(launch.date_utc).toLocaleString()}
          </p>
          <p className="mb-1">
            <strong>Details:</strong> {launch.details || "Not available at the moment."}
          </p>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          {launch.links.patch.small ? (
            <img
              src={launch.links.patch.small}
              alt="Mission Patch"
              className="h-20"
            />
          ) : (
            <SiApacherocketmq size={85} />
          )}
        </div>
      </div>
      <div className="w-full mt-4 flex justify-center space-x-4">
        {launch.links.wikipedia && (
          <a
            href={launch.links.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWikipediaW className="text-2xl text-blue-500" />
          </a>
        )}
        {launch.links.webcast && (
          <a
            href={launch.links.webcast}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-2xl text-red-500" />
          </a>
        )}
        {launch.links.reddit.launch && (
          <a
            href={launch.links.reddit.launch}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaReddit className="text-2xl text-orange-500" />
          </a>
        )}
      </div>
    </div>
  );

  const launchPadCard = (pad) => (
    <div
      key={pad.id}
      className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mb-6 bg-cover bg-center bg-no-repeat opacity-90"
      style={{ backgroundImage: `url(${pad.images.large[0]})` }}
    >
      <h3 className="text-2xl font-bold mb-2 drop-shadow-xl">{pad.name}</h3>
      <p className="mb-1 drop-shadow-xl">
        <strong>Region:</strong> {pad.region}
      </p>
      <p className="mb-1 drop-shadow-xl">
        <strong>Locality:</strong> {pad.locality}
      </p>
      <p className="mb-1 drop-shadow-xl">
        <strong>Status:</strong> {pad.status}
      </p>
      {/* <p className="mb-1"><strong>Details:</strong> {pad.details}</p> */}
    </div>
  );

  const starlinkCard = (starlink) => (
    <div
      key={starlink.id}
      className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mb-6"
    >
      <h3 className="text-2xl font-bold mb-2">
        Starlink {starlink.spaceTrack.OBJECT_NAME}
      </h3>
      <p className="mb-1">
        <strong>Launch Date:</strong>{" "}
        {new Date(starlink.spaceTrack.LAUNCH_DATE).toLocaleDateString()}
      </p>
      <p className="mb-1">
        <strong>Argument of periapsis:</strong> {starlink.spaceTrack.ARG_OF_PERICENTER || 'Not available'}
      </p>
      <p className="mb-1">
        <strong>SemiMajor Axis:</strong> {starlink.spaceTrack.SEMIMAJOR_AXIS || 'Not available'}
      </p>
      <p className="mb-1">
        <strong>Mean anomaly:</strong> {starlink.spaceTrack.MEAN_ANOMALY} 
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
      <div className="bg-gray-800 p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Upcoming Launches
        </h2>
        {upcomingLaunches.map((launch) => launchCard(launch, "Upcoming"))}
      </div>

      <div className="bg-gray-800 p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Previous Launches
        </h2>
        {previousLaunches.map((launch) => launchCard(launch, "Previous"))}
      </div>

      <div className="bg-gray-800 p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Launch Facilities
        </h2>
        {launchPads.map((pad) => launchPadCard(pad))}
      </div>

      <div className="bg-gray-800 p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Starlink</h2>
        {starlinks.map((starlink) => starlinkCard(starlink))}
      </div>
    </div>
  );
};

export default Dashboard;
