import { faker } from '@faker-js/faker';
import { NewIssue } from "../issue";
import { User } from "../user";
import { Comment } from "../comment";

export const seedIssues = (): NewIssue[] => {
    return many(createIssue);
}

export const createIssue = (): NewIssue => {
    return {
        comments: many(createComment, 3),
        course: faker.helpers.arrayElement(["IGIS", "IMT", "BWL", "IOBP"]),
        description: faker.lorem.paragraphs(),
        reporter: createUser(),
        state: faker.helpers.arrayElement(["Open", "Closed", "Rejected"]),
        title: faker.lorem.sentence(),
        type: faker.helpers.arrayElement(["Bug", "Improvement"]),
    }
}

const createComment = (): Comment => {
    return {
        id: -1,
        content: faker.lorem.sentence(),
        author: createUser(),
        createdAt: faker.date.past(1)
    }
}


const createUser = (): User => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
        email: faker.internet.exampleEmail(firstName, lastName),
        name: `${firstName} ${lastName}`
    };
}

function many<T>(fn: () => T, count?: number): T[] {
    const length = count ?? faker.datatype.number({min: 100, max: 200});
    return Array.from({length}, fn);
}