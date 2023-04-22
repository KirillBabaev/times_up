export interface IIssue {
    id: string,
    title: string,
}

export interface ITimeEntry  {
    issueId: String,
    date: Date,
    timeSpent: number,
}