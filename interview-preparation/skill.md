---
name: interview-preparation
description: DEPRECATED - merged into opportunity-evaluation
user_invocable: false
---

# Interview Preparation (DEPRECATED)

This skill has been merged into `/opportunity-evaluation`. Use that skill instead for:

- External recruiter screens
- Interview prep and debriefs
- Red/green flag analysis
- Energy checks and decision framework

All content from this skill is now in the consolidated job search skill.

## What the User Wants

Common requests:

- "Prep me for [Company] [Stage]" → Create prep document
- "I have an interview tomorrow" → Quick prep session
- "Help me debrief this interview" → Structured debrief
- "Should I continue with this company?" → Decision analysis
- "Draft my thank you email" → Post-interview follow-up
- "Create a recruiter screen template" → External recruiter screen template (see below)

---

## External Recruiter Screens (Different Approach)

**Why separate:** External recruiters are your reconnaissance—they give away real company info (health, structure, compensation, culture) in a way internal screens don't. This is an information-gathering phase, not a performance eval.

**Template location:** `{templates_folder}/external-recruiter-screen.md`
**Instance location:** `{companies_folder}/[Company]/interviews/[Recruiter]-Debrief-[Date].md` (filled-in version after call)

**Focus areas (not prep, but intelligence gathering):**

- Company health: funding, recent changes, leadership stability
- Real role: title, level, team structure, actual scope
- Compensation: range, equity, bonus, timeline
- Interview process: what to expect, timeline, who you'll meet
- Culture signals: pace, retention, management style

**Key questions to ask recruiter:**

- Why is this role open? (new, replacement, expansion?)
- What's company's current state? (layoffs, pivots, growth?)
- Who's my manager? What's their background?
- What's the interview process timeline?
- What's the actual comp range and equity structure?

**Red/green flags:**

- Red: Vague answers, unwilling to disclose comp, high urgency, team chaos
- Green: Transparent, specific details, stable leadership, clear process

## Prep Document Structure

Location: `{companies_folder}/[Company]/Interviews/[Stage]-[Date].md`

```markdown
# [Company Name] - [Interview Stage] - [Date]

**Interviewer:** [Name, Title]
**Duration:** [Minutes]
**Format:** Video/Phone/In-person

---

## Pre-Interview Prep

### What I Know About Them

-

### What They Know About Me

- ## Resume highlights relevant:

### My Goals for This Conversation

1.

---

## My Talking Points (Prepared Answers)

### "Tell me about yourself"

[60-90 second script - practice this out loud]

### "Why are you looking to leave your current role?"

[Honest but professional - what you want, not what you're running from]

### "Why [Company Name]?"

[Mission + model + role fit - be specific]

### "What are your salary expectations?"

[State current comp ($196K), don't justify, stop talking]

### [Role-Specific Question]

[Prepared answer]

---

## Questions I Will Ask

### Must-Ask (Non-negotiable)

**Question:**
**Why I'm asking:**
**Good answer looks like:**
**Red flag answer looks like:**

### Should-Ask (Important)

**Question:**
**Why I'm asking:**

### Nice-to-Ask (If time permits)

**Question:**

---

## Red Flags to Watch For

### In Their Answers

- [ ] Vague responses to specific questions
- [ ] Deflecting concerns instead of addressing
- [ ] Defensive about company/culture criticism
- [ ] Overpromising or overselling
- [ ] "We need someone like you to fix this"

### In Their Behavior

- [ ] Late to call without apology
- [ ] Distracted or multitasking
- [ ] Unprepared (hasn't read resume)
- [ ] Cutting conversation short
- [ ] Pressuring for quick decision

### In The Process

- [ ] Unclear next steps
- [ ] Disorganized scheduling
- [ ] Long delays without communication
- [ ] Changing role requirements

---

## Green Flags to Watch For

### In Their Answers

- [ ] Specific, concrete examples
- [ ] Acknowledges challenges honestly
- [ ] Clear about expectations and support
- [ ] Evidence of self-awareness
- [ ] Asks thoughtful questions about me

### In Their Behavior

- [ ] Respectful of my time
- [ ] Engaged and present
- [ ] Prepared with specific questions
- [ ] Clear communication
- [ ] Collaborative conversation

### In The Process

- [ ] Clear timeline and next steps
- [ ] Organized and professional
- [ ] Responsive to questions
- [ ] Consistent messaging

---

## Scripted Gap Answers (if asked)

| Tool/Tech               | Script                                                                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **NestJS**              | "I've built extensively in Node.js and Express; NestJS is the framework layer on top — I'd be productive quickly and have been evaluating it." |
| **Redis/Kafka**         | "I've worked with event-driven architectures via SNS/SQS — I'd evaluate Redis/Kafka as the right tool where warranted."                        |
| **Databricks/Fivetran** | "I've designed the data service layers these tools plug into — familiar with the category, not hands-on yet."                                  |
| **Go/Golang**           | "I haven't shipped in Go but have the systems background to ramp — the question is how much of the day-to-day is Go vs adjacent work."         |

---

## Post-Interview Debrief

**Date completed:**
**Actual duration:**

### What Went Well

### What Was Hard

### Questions They Asked Me

1.

### Questions I Asked Them

1.

### Key Takeaways

### Red Flags Identified

-

### Green Flags Identified

-

### Unanswered Questions

-

### My Gut Feeling

[Trust this - if something feels off, it probably is]

### Energy Check

- [ ] Energized and excited
- [ ] Neutral/professional
- [ ] Drained or uncomfortable
- [ ] Red flags in my body (anxiety, shutdown, people-pleasing mode)

### Decision

- [ ] ✅ Advance - I want to continue
- [ ] ⏸️ Pause - Need more information
- [ ] ❌ Withdraw - This isn't the right fit
- [ ] 🤔 Unsure - Need to process more

**Reasoning:**

### Next Steps

- [ ] Send thank you email
- [ ] Follow up on [specific item]
- [ ] Prepare for next round
- [ ] Research [specific area]

### Notes for Next Round

---

## Thank You Email

**Template:**
```

Subject: Thank you - Isaac Kehle - [Role]

Hi [Interviewer Name],

Thank you for taking the time to speak with me today about [specific topic discussed]. I particularly appreciated learning about [specific thing they shared].

[Optional follow-up item]

I'm excited about [specific aspect] and look forward to [next steps].

Best,
Isaac Kehle

```

**Sent:** [ ] Yes [ ] No
**Date:**
```

## Key Must-Ask Questions

### For Nervous System Fit

**"How would you describe the pace of work here?"**

- Good: "Sustainable, we value work-life balance"
- Red flag: "Fast-paced, we work hard play hard"

**"How do you handle Friday deadlines with weekend approaching?"**

- Good: "We plan to avoid Friday crunches, respect personal time"
- Red flag: "Sometimes we have to push through"

**"How do you support engineers with different working styles?"**

- Good: "Flex hours, async communication, results over hours"
- Red flag: "Everyone's expected to be available during core hours"

### For Management Quality

**"How do you handle it when someone on your team is struggling?"**

- Good: Specific example of support
- Red flag: Vague, "they just need to step up"

**"What's your approach to giving feedback?"**

- Good: Regular 1:1s, specific, growth-oriented
- Red flag: "I give feedback when needed" (rarely)

### For Technical Culture

**"How do you handle technical debt?"**

- Good: Acknowledges it exists, has strategy
- Red flag: "We don't have technical debt" or "We just ship"

**"Can you walk me through a recent architectural decision?"**

- Good: Clear trade-offs, collaborative process
- Red flag: Can't think of one, top-down decisions only

## Decision Framework

### Advance (✅) when:

- Majority of green flags present
- No major red flags
- Energy check: energized or neutral
- Gut feeling: positive

### Pause (⏸️) when:

- Mixed signals
- Important questions unanswered
- Minor red flags that could be clarified

### Withdraw (❌) when:

- Major red flags identified
- Energy check: drained, anxious, shutdown
- Gut feeling: something's off
- Financial fit not viable

## Energy Check Guidelines

**Energized/Excited:** Rare, pursue aggressively
**Neutral/Professional:** Acceptable, proceed with caution
**Drained/Uncomfortable:** Warning sign, investigate why
**Body red flags (anxiety, shutdown, people-pleasing):** This is data, honor it

Remember: Isaac is recovering from burnout. Nervous system signals are **critical data**, not weakness.

## What Not To Do

- Don't skip the must-ask questions (they protect you)
- Don't ignore red flags hoping they'll change
- Don't perform "perfect candidate" at expense of authenticity
- Don't skip the debrief (captures insights while fresh)
- Don't advance just because you're flattered by interest

## Remember

The interview is **bidirectional**:

- They're evaluating Isaac
- Isaac is evaluating them
- Both sides should be trying to determine fit

Signs of a healthy process:

- They answer your questions thoughtfully
- They encourage you to take time deciding
- They're transparent about challenges
- They respect your boundaries

Signs of a unhealthy process:

- They rush you through questions
- They get defensive about concerns
- They pressure for quick decisions
- They dismiss your questions

Trust the process. Trust your gut.

---

## Apple Reminders for Interviews

### Creating Interview Reminders

When an interview is scheduled, create a reminder in Apple Reminders:

```
Create reminder:
- Title: "[Company] - [Stage] Interview"
- Due Date: [Interview date]
- Priority: High
- Alarm: 1 day before (relative offset: 86400)
```

**Stages to track:**

- Phone Screen / Initial Call
- Technical Round
- System Design / Take-home
- Behavioral / Final Round
- Offer Review

### Interview Prep Workflow

1. **Reminder triggers 1 day before interview**
2. **Review prep document:** `Career/interview-prep/[Company]-[Stage]-[Date].md`
3. **Run debrief after interview**
4. **Complete reminder in Apple Reminders**
5. **Update company file** with interview outcome

### Follow-up Reminders

After each interview, create a follow-up reminder if action is needed:

```
Create reminder:
- Title: "Follow up: [Company] - [Specific action]"
- Due Date: 3-5 days after interview
- Priority: Medium
```

**Follow-up actions:**

- Thank you email sent? (create reminder to send if not done)
- Questions for next round?
- Reference check?
- Negotiation feedback?

### Checking Interview Reminders

When Isaac asks to "check my reminders":

- Query incomplete interview reminders → upcoming interviews to prep for
- Query completed interview reminders → add outcomes to company files
- Update Interview Process table in `[Company Name].md` with dates and outcomes
