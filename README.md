# Flywheel Studio Technical Assessment Task

This is a project made with the NextBase stack (Next.js, Supabase, and TailwindCSS) for a Flywheel Studio technical assessment task.

## Getting Started

Make sure you install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

And create a .env.local file with the variables from the .env.example file. If you are unsure if your database will match the schema, you can check the types/database.ts file or app/\_lib/types/tasks.ts to see the expected schema.

You can run the following command to generate your project types:

```bash
npx supabase gen types typescript --project-id (your-project-id) > _lib/types/database.ts
```

Now you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## When editing the database schema

Make sure to run the following command to update the database schema:

```bash
npx supabase gen types typescript --project-id (your-project-id) > _lib/types/database.ts
```

## Design Decisions

### Redirection

Not creating needless friction in a user's journey is paramount, but there are cases where having a validated user is needed. This is one of those cases, since it'd make very little sense to have a task manager app that can't give you persistent edition, creation or deletion of your tasks. If the app was being used by one user exclusively, there'd be no need for a user since Row Level Security (RLS) would be redundant, but the existence of many users makes it so that users are necessary, and this is why there's no point in allowing the user to access the main dashboard page without being logged in.

### Modal Views

So, why then implement a Modal View? This has to do with the tasks layout. I considered the immediately visible controls should be the options to search, filter, sort and switch between kanban or timeline view. In order to keep the UI simple, having the creation and editing forms pop up with a semi-transparent modal view made the most sense. This is also great for adapting to smaller screen sizes since it allows the app to focus on smaller size changes rather than full layout shifts.

### Kanban View

Kanban view is simple enough with the task assigned to the development of this app, but I want to highlight that unlike most two-column layouts that usually can simply switch to one-column in smaller screen sizes, this is meant to be a contained and interactable piece of the UI, since it's one of the main features of it. This is why on mobile, the kanban view makes each column take up 85% of the screen width, this way the user can mainly interact with the column they're interested in while suggesting the existance of another column and the scrollability of the kanban view.

### Optimistic Updates

I chose to implement optimistic updates for filter switching, task status updates and task deletion, but not for task creation. This is because I figured a user may want to create multiple tasks in a sitting, and I consider it a more sensible user experience to have confirmation for each task creation before a user moves on to the next one, as having instant feedback could lead to a user forgetting about the task they just created or getting confused about what's going on behind their screen. This would be a good option if the content creation was directly next to or equally visible as the task list when creating new tasks, but since I went with a modal view for creating and editing tasks, I decided it's better to let the user know the update is taking place and has not been confirmed immediately (separation of concerns applied to user experience).

### Timeline View

This is a lot more complex since it involves a dynamic grid. For this layout, two main things are required:

- A date header that can span the entire date ranges from the earliest created task to the latest due date, this way we can let the user know what the timeline columns represent.
- The tasks now need to stretch to match their corresponding data. This can be done since we have their created date and due date.

This is a peculiar layout, since it does come with a bunch of edge cases. What if the user has a thousand tasks? They'd have to scroll forever, possibly over an empty grid if the tasks are very spread out in time. What if the user is feeling a little silly and tries to set a due date for the year 3000? The grid would go on for a very long time pointlessly. For this implementation I simply generated succesive dates with the earliest created task as the starting point and the latest due date as the ending point, but there's definitely a lot of caveats to this particular UI piece. You could make it so that if a task is going on for weeks and there's no other tasks that overlap amongst those weeks, a column could represent a week, month, year and so on in order to make the display more usable.

### Filtering and Sorting

The filtering and sorting is handled on the server side, since should a user have lots of tasks, the client-side filtering and sorting would be inconsistent at best and a significant performance issue at worst (especially as the app grows and more data is added to the task schema). The sorting and filtering is handled by using the URL parameters to sort the tasks on the server side, using react's useTransition hook to prevent the UI from freezing while the tasks are being sorted and filtered. This allows our users to see visual feedback of their action, as well as interact freely with the filters and sorting options while the tasks are being rearranged.

### Custom Urgency Heuristic

I added a custom urgency sorting option, since I considered it a very useful feature for users to have. The sorting algorythm makes it so that tasks are order by the following criteria:

- Is a task pending
- Does a task have a due date
- If it has a due date, how close is it to the due date?
  - Is it overdue?
  - Is it due within 24 hours?

This makes it so that our users can have a way to check how they're doing regarding their deadlines, using the existing data as a metric.

### Search Functionality

Our users can also sort by searching for a term included in a task title. I deliberately chose to not include description matches in the search functionality, since It could lead to cluttering the search results with tasks that may not be directly related to the search term.

### Light/Dark Mode

User preference matters, every app should have the option to switch pallettes if the user so wishes.

## Next steps

- Add animations and page transitions (makes for a much smoother user experience, I'd use FramerMotion for it). I wanted to do this for the deadline but I was relearning the stack so I ran into some setbacks and wasn't as efficient as I'd like to be.
- Refactor TimelineList's dynamic grid to handle the cases I mentioned in the "Timeline View" section.
- Make the tasks organizeable by drag and drop.
- Add deadline notification options.
- Add a priority property to the schema to handle larger projects.
- Thoroughly test the UI and accessibility.
- Improve Mobile UI, it currently works but there's room for improvement.