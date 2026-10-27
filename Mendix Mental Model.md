- not a traditional software engineer > didnt study computer science
- insatiably curious and resilient learner
- first years were slow, because I was still dependent on senior colleagues
- but the moment I started using AI, eveything changed.
- not because i was just shipping faster, but because I started looking at problems from a different perspective.
- the analytical ability and the pragmatic approach were already there, i was just missing a layer of abstraction that would allow me to be more independent as software engineer. 
- when i start building my own agentic system, i had to understand how a model receives a prompt and how it solves that prompt against a given codebase. This pushed me to understand software at a system level, from an architectural point of view.
- I was now interested in understandig E2E dataflows and how user-stories would fit in these data-flows.

================================================

“I didn’t study computer science, so early on I lacked the mental models to approach complex tasks, and I relied on senior colleagues, whose time was limited. When I started using AI, that limit disappeared. My questions grew from feature-level ones to questions about the system itself.

Then I built my own agent system, and what surprised me was this: models tend to go along with your framing. If I didn’t understand the complexity of a problem, the model wouldn’t either. I’d finish the task, but the bigger picture would get lost along the way. That changed how I work. I now start from the system: the data flows, where the user story fits, what could go wrong. And I built review steps and approval gates into the agent so that it challenges my assumptions instead of agreeing with them.

That’s why this role interests me. If people get the best from AI only when they can frame their problem well, the interface can help them do that.”

============================================

Maybe i can answer both questions in one go:
What surprised me the most while building my system was the fact that once you understand the problem in front of you, the level of accuracy of AI feedback becomes less relevant. I learned that earlier models would always be looking to agree with your idea. If you didn't understand the complexity of the task in front of you, the models wouldn't understand it as well. You'd probably finish your task, probably with some valuable input from AI, but the analysis of complexity or the 'solving the problem on the bigger picture' would fade away during this implementation.
I feel that once i learned this, it pushed me from thinking at a component level to thinking at a system level

=======================================

Is the last claim true? Only keep “I built review steps so it challenges my assumptions” if your system really does that. Your CV mentions review roles and adversarial tests, but you know the details.

yes, i think this is related with what i just mentioned: the relationship between human and AI agent is very peculiar. whatever this interaction ends up being, the human is always responsible for what is being delivered. 
even when the human feels confortable with the codebase, relying or discussing with AI always carries an extra layer of responsability. that's the reason why i decided on certain approval gates or extra testing layers: even when the human masters prompting or dominates the codebase, AI still has space to make mistakes. these control layers give the user more confidence in these workflows


====================================================

“I didn’t study computer science, so early on I lacked the mental models for complex tasks, and I relied on senior colleagues, whose time was limited. AI removed that limit: I could now ask freely, and my questions grew from how to build a feature to how the whole system fits together.

Then I built my own agent system, and what surprised me was that models tend to go along with your framing. If I didn’t understand the problem, neither would the model, and I’d finish the task while the bigger picture got lost. That moved me from thinking about components to thinking about systems.

It also taught me that I’m accountable for whatever ships. Once you accept that, you start asking which flaws in a system would really hurt, and that tells you where to put approval gates, which principles are non-negotiable, and how testing and review can catch most of the rest. So I built those controls into my workflow, including a review step that looks for hidden assumptions in finished code. Regressions dropped noticeably afterwards.

I think that’s how AI should work for everyone: good output depends on how well people frame the problem, and the controls are what make it trustworthy. That’s what interests me about this role.”

======================================================

An equally plausible explanation is that the tasks were well specified enough for cheaper models to handle, so the result tells you more about the task than about who did the reasoning.

right, but the idea of redisigning the system came from me, the whole planning discussion passed through me, etc. basically all decisions relied on my reasoning and the result is that the process was simplified to a point where tasks were clear/simple enough for free/cheap models to complete them successfully


=====================================================


I didn’t study computer science, so early on I lacked the mental models for complex tasks, and I relied on senior colleagues, whose time was limited. AI removed that limit. I could ask freely, and my questions grew from how to build a feature to how the whole system fits together.

Then I built my own agent system, and what surprised me was that models tend to go along with your framing. If I didn’t understand the problem, neither would the model, and I’d finish the task without really understanding what made it complex. That moved me from thinking about components to thinking about systems.

Working with AI changed how I look at problems. I stopped seeing a task as a piece of code to write and started seeing where it sits in the whole system, and I shaped my workflows around that. One result is that tasks became clear enough for much cheaper models to handle.

It also taught me that I’m accountable for whatever ships. Once you accept that, you start asking which flaws in a system would really hurt, and that tells you where to put approval gates, which principles are non-negotiable, and how testing and review can catch most of the rest. So I built those controls into my workflow, including a review step that looks for hidden assumptions in finished code. I saw fewer regressions afterwards.

AI is very good at processing large amounts of information and connecting things across layers of an interface. What it can’t know unless someone tells it is what the user is actually trying to do and how it should feel to them. That context comes from people, from user stories and from working with designers, and that’s the part I want to be close to.

I think that’s how AI should work for everyone: good output depends on how well people frame the problem, and the controls are what make it trustworthy. That’s what interests me about this role.
