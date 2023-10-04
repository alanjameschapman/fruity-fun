# Fruity Fun

Fruity Fun is a solo puzzle game, in which the user must deduce the value of each fruit shown in the 'shopping basket'. This can be done using trial-and-error or by solving as simultaneous equations. As such, this site is predominantly intended for secondary school Maths students but can be enjoyed by anyone who likes a puzzle!

## Planning

The website has been designed for mobile-first, from iPhone 6 and onwards, and will be responsive for larger screen sizes. It is envisaged that the majority of users will be viewing from mobiles. Moreover, it is easier to design for small screens then enlarge for desktops vs the other way around.

![Responsive Mockup](am-i-responsive screenshot saved in docs)

### Lessons learned from previous project applicable to this one

- Images could be converted to .webp images and compressing with tinyPNG, in an effort to improve lighthouse performance.
- Include section on bug fixes.
- Deployment section could include include info on cloning or forking to enable future development by 3rd parties.
- Don't leave any HTML errors unfixed.
- Add favicon and page 404.
- Style submit buttons.
- Avoid commit messages like "take 2".

### User Experience

- Users who want to play a solo, fun interactive game.
- Users who want to learn fundamental mathematical concepts.
- Ability to change the level of difficulty, depending on ability.

## Functionality

For a description of each function, docstrings are provided within the JS file. The site is broken down into the following sections:

### Instructions Area

Instructions provided to user, along with a link to help them understand how to answer the questions.

### Game Mode Area

Allows the user to select their preferred difficulty level using submit buttons.

### Question Area

Displays a set of equations using emoji strings, always evaluating to positive answers for realism.

### Answer Area

Allows the user to input their guesses. Input fields are contrained to value between 1 and 7 units as per instructions.

### Feedback Area

Displays feedback ot the user, showing how their guesses compare with the correct answers.

### Score Area

Displays a tally of correct and incorrect answers

### Color palette and contrast

A fruity background has been used to add realism.

### Font Choice

A font without serifs was used to add a desirable informal tone to the site.

Chakra Petch is a variable font, which may help to reduce font family file size. Refer to different weights etc.

## Testing

Once the website was deployed I checked using W3C validator at every push/deployment - see Validator Testing section below. I also continuously tested my website on different screen sizes using DevTools on Chrome and different devices.

### HMTL validation

No errors or warnings were returned when passing through the official [W3C validator](link goes here)

### CSS validation

No errors were found when passing through the official [(Jigsaw) validator](link goes here)

### LIGHTHOUSE validation

Initial lighthouse results showed room for improvement in all facets, bar 'Best Practices'.

![Initial Lighthouse results](/docs/lighthouse/lighthouse-initial.png)

Adding labels to the input boxes, reducing transparency (to improve contrast ratio), and adjusting heading levels made a slight improvement to accessibility - 83 to 85, so this might be addressed later:

![Lighthouse results after accessibility tweaks](/docs/lighthouse/lighthouse-labels-transparency-headings.png)

Adding meta tags to the html head increased the SEO from 82 to 100:

![Lighthouse results after SEO tweaks](/docs/lighthouse/lighthouse-meta-tags.png)

The remaining improvements are regarding Accessibility:

![Lighthouse Accessibility issues](/docs/lighthouse/lighthouse-accessibility.png)

Adding aria-labels to the input fields improves accessibility from 87 to 97:

![Lighthouse aria-label](/docs/lighthouse/lighthouse-aria-label.png)

### Debugging Code

The first main hurdle I faced was accessing the fruit1 and fruit2 variables. I needed to access these from the checkAnswers function but the fruit values were assigned within the scope of the displayEasyQuestion function. I believe the problem would have been easiest to solve by assigning these in the global scope but this is bad practice.

I spent a long time trying to pass these as parameters from one function to the next. Chrome devtools proved particularly useful here, as I was able to step through my code and pinpoint exactly when the variables vanished from Scope, although I ultimately failed to carry them through to the checkAnswers function. Eventually I realised I could access these from the DOM using a combination of parseInt, getElementsById, and using unique IDs within the HTML which had itself been created using template litorals.

I also had a struggled to pass through gameMode from the event listener, but eventually solved this using the .firstchold method to get from the DOM.

### Peer review

- I deployed before content creation for feedback from Mentor and friends.
- I also posted to #peer-code-review on Slack for peer review.

## Deployment

The site was deployed to GitHub pages. The steps to deploy were as follows:

- In the GitHub repository, I navigated to the Settings tab
- From the source section drop-down menu, I selected the Master Branch
- Once the master branch was selected, the page refreshed with a ribbon showing successful deployment.
- The live link can be found here - <<https://alanjameschapman.github.io/fruity-fun/>

## Future Enhancements

Instead of an incremental tally a countdown could be used to add some jeopardy. Perhaps a countdown from 5 lives.

## Credits

Following on from #peer-code-review on Slack and mentor feedback I implemented a few fixes:

- Used aria-label instead of label
- Feedback 2 etc.

### Content

The Chakra Petch font was taken from Google Fonts and the author is Cadson Demak.

The background image is from [Pexels](https://www.pexels.com/). The author is Any Lane.

The favicon is from the open source project Twemoji, copyright 2020 Twitter, Inc and other contributors. It is licensed under CC-BY 4.0.

The site is intended solely for educational purposes. All images and favicons remain the property of those credited above

### Structure

The Code Institute's Love Maths! website was used as guidance for semantic structure and commit journey.

Some elements of this Readme have been taken and repurposed from the Readme shared by the author's PP1.

## Self-assessment AKA Reaching for Distinction

**Design** evidence
**Information Hierarchy** evidence
**User Control** evidence
**Consistency** evidence
**Confirmation** evidence
**Accessibility** evidence
**Development and Implementation** evidence
**Clean code** evidence
**Naming Conventions** evidence
**File Structure** evidence
**Readability** evidence
**Defensive Design** evidence
**Comments** evidence
**Compliant Code** evidence
**Robust code** evidence
**Real-world application** evidence
**Version control** evidence
**Design** evidence
**Documentation of Development** evidence
