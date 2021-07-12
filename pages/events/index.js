import { useRouter } from 'next/dist/client/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

const AllEvents = ({ events }) => {
	const router = useRouter();

	const findEventHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	};
	return (
		<div>
			<EventsSearch onSearch={findEventHandler} />
			<EventList events={events} />
		</div>
	);
};

export const getStaticProps = async () => {
	const res = await fetch(
		'https://max-next-66e41-default-rtdb.europe-west1.firebasedatabase.app/events.json'
	);
	const data = await res.json();

	const events = [];
	for (const key in data) {
		events.push({
			id: key,
			...data[key],
		});
	}

	return {
		props: {
			events: events,
		},
		revalidate: 1800,
	};
};

export default AllEvents;
