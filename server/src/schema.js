import { readFileSync } from 'fs';

function readSchema() {
	return readFileSync('src/schema.graphql').toString('utf-8')
}

export default readSchema;
