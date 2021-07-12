import { useRouter } from 'next/dist/client/router';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById } from '../../dummy-data';

const EventDetailPage = ({ event }) => {
	// const route = useRouter();
	// const currentEvent = getEventById(route.query.eventid);
	if (!event) {
		return <p>No event like this</p>;
	}
	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.imageAlt}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	);
};

export const getStaticProps = async (context) => {
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
	const eventCur = curEvent.find(
		(el) => el.id === context.params.eventid
	);

	return {
		props: {
			event: eventCur,
		},
		revalidate: 30,
	};
};

export const getStaticPaths = async () => {
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
	const paths = curEvent.map((event) => ({
		params: { eventid: event.id },
	}));
	return {
		paths: paths,
		fallback: 'blocking',
	};
};

export default EventDetailPage;

// id: 'e3',
// title: 'Networking for extroverts',
// description:
// 	'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
// location: 'My Street 12, 10115 Broke City',
// date: '2022-04-10',
// image: 'images/extrovert-event.jpg',
// isFeatured:
