import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../dummy-data';

const HomePage = ({ curEvent }) => {
	// console.log(curEvent);
	// const featuredEvents = getFeaturedEvents();
	// const featuredEvents = [];

	return <EventList events={curEvent} />;
};

export const getStaticProps = async () => {
	const res = await fetch(
		'https://max-next-66e41-default-rtdb.europe-west1.firebasedatabase.app/events.json'
	);
	const data = await res.json();

	const curEvent = [];
	for (const key in data) {
		curEvent.push({
			id: key,
			...data[key],
		});
	}

	return {
		props: {
			curEvent: curEvent,
		},
		revalidate: 1800,
	};
};

export default HomePage;
