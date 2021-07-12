import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import Button from '../ui/button';

import classes from './event-item.module.css';
const EventItem = ({ event }) => {
	const { title, date, location, id, image } = event;
	const humanReadable = new Date(date).toLocaleDateString(
		'en-US',
		{
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}
	);
	const exploreLink = `/events/${id}`;
	const formatLocation = location.replace(', ', '\n');
	return (
		<li className={classes.item}>
			<img
				src={`/${image}`}
				alt=''
				className={classes.img}
			/>
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{humanReadable}</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{formatLocation}</address>
					</div>
				</div>
			</div>
			<div className={classes.actions}>
				<Button link={exploreLink}>
					<span>Explore Event</span>
					<span className={classes.icon}>
						<ArrowRightIcon />
					</span>
				</Button>
			</div>
		</li>
	);
};

export default EventItem;
