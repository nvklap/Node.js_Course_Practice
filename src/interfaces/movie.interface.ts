import { Types } from 'mongoose';

export default interface IMovie {
	title: string;
	description: string;
	release_date: Date;
	genre: Types.ObjectId[];
}
