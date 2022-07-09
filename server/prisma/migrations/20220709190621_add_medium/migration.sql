-- CreateEnum
CREATE TYPE "Medium" AS ENUM ('LearnApp', 'OnlineTest', 'Podcast', 'SampleExam', 'Script', 'Vodcast');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "medium" "Medium" NOT NULL DEFAULT E'Script';
