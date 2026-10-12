/**
 * The on-site assistant's question set: questions real visitors ask, and what
 * a correct answer must contain. Run it after changing the copy in
 * src/data/site.js or anything in src/lib/assistant/:
 *
 *   npm run assistant:check
 *
 * This checks the local (in-browser) answers, which are what every visitor
 * gets when the hosted assistant is off, slow or down.
 */
import { answer } from '../src/lib/assistant/answer.js'

// [question, text the answer must contain] — `null` means it must decline.
const cases = [
  ['Do you guarantee leads?', 'No.'],
  ['Will I rank #1 on Google?', 'No.'],
  ['What is your phone number?', '+91'],
  ['Can I call you?', '+91'],
  ['What is your whatsapp', 'Email:'],
  ['Where are you based?', 'Edappal'],
  ['Do you work with clients outside India?', 'worldwide'],
  ['Are you a registered company?', "aren't on this site"],
  ['Do you offer refunds?', "aren't published"],
  ['Do you take an advance?', "aren't published"],
  ['Can you do a Shopify store?', "isn't one of the tools"],
  ['Do you use React?', 'Yes, React'],
  ['Can you connect to Zoho CRM?', 'audit'],
  ['What tech do you use?', 'React'],
  ['How much does a website cost?', 'quoted to its requirements'],
  ['How long does a build take?', 'Two weeks'],
  ['Do you build mobile apps?', 'Yes.'],
  ['Do you do logo design?', 'Brand identity'],
  ['Can you automate my emails?', 'repetitive steps'],
  ['I need a website for my clinic', 'Next step'],
  ['Do you speak Malayalam?', 'Malayalam'],
  ['Is hosting included?', 'Care plan'],
  ['Can I see your work?', 'Holytouch'],
  ['how do i start', 'form'],
  ['are you a freelancer', 'founder'],
  ['What is your process', 'Scope'],
  ['What is Orbelis?', 'founder-led'],
  ['is the site mobile friendly', 'phone'],
  ['what is the weather today', null],
  ['tell me a joke', null],
  ['who is the prime minister of india', null],
]

// Follow-ups, read with the question before them.
const followUps = [
  [['Do you do SEO?'], 'what about Instagram?', 'Instagram'],
  [['How much is a website?'], 'how long does that take?', 'Two weeks'],
]

let failed = 0
const check = (label, reply, expect) => {
  const ok = expect === null ? !reply.grounded : reply.grounded && reply.text.includes(expect)
  if (!ok) {
    failed++
    console.log(`FAIL  ${label}\n      expected ${expect === null ? 'a decline' : JSON.stringify(expect)}\n      got: ${reply.text.slice(0, 160).replace(/\n+/g, ' / ')}`)
  }
}

for (const [q, expect] of cases) check(q, answer(q), expect)
for (const [before, q, expect] of followUps) {
  check(`${before.join(' → ')} → ${q}`, answer(q, before.map((text) => ({ role: 'user', text }))), expect)
}

const total = cases.length + followUps.length
console.log(failed ? `\n${failed} of ${total} failed` : `All ${total} answers correct`)
process.exit(failed ? 1 : 0)
