# Schedule

So, this didn't quite go as smoothly as I'd perhaps have liked.

If you look through the history, I initially attempted to create a way to check when each person has time to attend meetings, then check that against every other person's calendar.

This got very messy very quickly.

Thankfully, I'd got a few tests up and running, so could quite quickly convert to simply checking every time between the start of the day and the end of the day, which turns out to just work a lot better.

Even though this is simply a "try everything until something works" approach, I don't think it's likely to be too much of a problem, as there's only ~600 options to check, and the number of attendees to any given meeting is unlikely to be very large either.

## Tests

To run the tests, simply install dependencies, and run `npm test`.