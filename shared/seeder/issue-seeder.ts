import { faker } from '@faker-js/faker';
import { NewIssue } from "../issue";

export const seedIssues = (many?: number): NewIssue[] => {
    const length = many ?? faker.datatype.number({min: 100, max: 200});
    return Array.from({length}, createIssue);
}

const createIssue = (): NewIssue => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
        course: faker.helpers.arrayElement(["IGIS", "IMT", "BWL", "IOBP"]),
        reporter: {
            email: faker.internet.exampleEmail(firstName, lastName),
            name: `${firstName} ${lastName}`
        },
        created: faker.date.past(3),
        description: faker.lorem.paragraphs(),
        state: faker.helpers.arrayElement(["Open", "Closed", "Rejected"]),
        title: faker.lorem.sentence(),
        type: faker.helpers.arrayElement(["Bug", "Improvement"]),
    }
}