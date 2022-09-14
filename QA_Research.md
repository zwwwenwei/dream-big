# Quality Assurance Testing Research Document

## Table of Content

[Definations](#quality-assurance-definitions)

[Testing steps](#quality-assurance-testing-steps)

[Testing Tables](#quality-assurance-testing-tables)

[Testing Research](#quality-assurance-testing-research)

## Quality Assurance Definitions

*If you wish to see this section in your browser, here's a [link to Teams document][1]. Please see page one for the Definition.*

- **Manual QA Test types**
    - Acceptance Testing: Run by client or end-user. To check if the software meets the agreement requirements. Happens before the product’s final release.
    - Black Box Testing (Behavioural testing): To analyse the application’s functionality from the end-users point. Testers can’t see the internal code structure and only focus on input and outcomes.
    - Integration Testing: Tests with two or more integration components. Testing on the connections and interactions between components.
    - System Testing: Testing the whole system, involves installability testing and recovery testing. 
    - Unit Testing: Run by developers. Test individual units or components.
    - White Box Testing: Run by developers, check the software’s internal code before passing it on. Amin to increase security and improve usability.

` `  

- **Automated QA Test types**
    - Unit tests: Run by developers. Test individual units or components.
    - Integration tests: Tests with two or more integration components. Testing on the connections and interactions between components.
    - System testing – Functional testing: Check if the system functions as intended. 
    - System testing – Regression testing: Check if the new code isn’t interrupting the old function.
    - System testing – Smoke tests: Check if the core functionality is working probably.
    - Acceptance tests – Performance tests: Check if the backend can perform under the expected load from users. Includes stress tests, load tests and responsiveness tests.
    - Acceptance tests – A/B testing: Allows users to try which version of features and UI elements is preferred. 
    - API testing: Stands for the Application program interface, verify if it satisfies the functionality, security, performance, and reliability.

## Quality Assurance Testing steps

*If you wish to see this section in your browser, here's a [link to Teams document][1]. Please see page two for the testing steps.*

According to the research ([QA Research Document][3]), Dream Big project should combine Auto and Manual testing for better quality assurance. The following steps are designed and suggested for Dream Big Testing. 

- Before merging the local repo to GitHub:
    - Run **Auto Unit Test** by **developers** to check your spelling and errors with your coding software.
    - Run **Auto System Test – Regression Test** by **developers** to see the application if it starts and functions as intended.
    - Run **Manual White Box Test** by **developers** for the Developer's last review on their code and user interface before upload.

` ` 

- After new codes are added to GitHub:
    - Run **4.	Manual System Test** by **tester** to check the download, install instruction and recovery ability.
    - Run **Manual Black Box Test** by **tester** to test the UI, input and output results.
    - Optional: *Run **Acceptance Test - A/B Test** by **tester** to check which version of features and UI element is preferred.*

` `  

- At the end of term, before hand-over:
    - Optional: *Run **Manual Acceptance Testing** by **tester** to test from all aspects to see if the software is meeting all the requirements.*

## Quality Assurance Testing Tables

*If you wish to see this section in your browser, here's a [link to Teams document][2].*

- Click here to see [White Box Test](#manual-white-box-test)'s testing table
- Click here to see [System Test](#manual-system-test)'s testing table
- Click here to see [Black Box Test](#manual-black-box-test)'s testing table
- Click here to see [Acceptance Test - A/B Test](#optional-acceptance-test---ab-test)'s testing table
- Click here to see [Acceptance Test](#optional-manual-acceptance-test)'s testing table

#### **Manual White Box Test**

|Test ID:         |WhiteBox_001|Test designed by:|       |
|-----------------|------------|-----------------|-------|
|Test Description:|            |Designed date:   |       |
|                 |            |Test executed by:|       |
|                 |            |Executed date:   |       |

|Tested product:|                |             |             |        |
|---------------|----------------|-------------|-------------|--------|
|Step           |Step Description|Expect result|Actual result|Comments|
|1              |                                                     |
|2              |                                                     |

#### **Manual System Test**

|Test ID:         |System_001|Test designed by:|       |
|-----------------|----------|-----------------|-------|
|Test Description:|          |Designed date:   |       |
|                 |          |Test executed by:|       |
|                 |          |Executed date:   |       |

|Tested product:|           |             |             |        |
|---------------|-----------|-------------|-------------|--------|
|Step           |Step Action|Expect result|Actual result|Comments|
|1              |                                                |
|2              |                                                |

#### **Manual Black Box Test**

|Test ID:         |BlackBox_001|Test designed by:|       |
|-----------------|------------|-----------------|-------|
|Test Description:|            |Designed date:   |       |
|                 |            |Test executed by:|       |
|                 |            |Executed date:   |       |

|Tested product:|           |     |             |             |        |
|---------------|-----------|-----|-------------|-------------|--------|
|Step           |Step Action|Input|Expect result|Actual result|Comments|
|1              |                                                      |
|2              |                                                      |

#### **Optional: Acceptance Test - A/B Test**

|Test ID:         |A/B_001|Test designed by:|       |
|-----------------|-------|-----------------|-------|
|Test Description:|       |Designed date:   |       |
|                 |       |Test executed by:|       |
|                 |       |Executed date:   |       |

|Item|Item being tested|Item Description|A or B?|Comments|
|----|-----------------|----------------|-------|--------|
|1                                                       |
|2                                                       |

#### **Optional: Manual Acceptance Test**

|Test ID:         |Acceptance_001|Test designed by:|       |
|-----------------|--------------|-----------------|-------|
|Test Description:|              |Designed date:   |       |
|                 |              |Test executed by:|       |
|                 |              |Executed date:   |       |

|Tested product:|           |     |             |             |        |
|---------------|-----------|-----|-------------|-------------|--------|
|Step           |Step Action|Input|Expect result|Actual result|Comments|
|1              |                                                      |
|2              |                                                      |

## Quality Assurance Testing Research
 
*If you wish to see this section in your browser, here's a [link to Teams document][3].*

#### **Contents**

- [Introduction](#introduction)
- [What is QA testing](#what-is-qa-testing)
- [Why is QA testing needed?](#why-is-qa-testing-needed)
- [Different types of QA test](#different-types-of-qa-test)
- [QA test with Agile?](#qa-test-with-agile)
- [Planning for QA testing](#planning-for-qa-testing)
- [Mock Tests](#mock-tests)
- [Documenting the tests](#documenting-the-tests)
- [Future directions?](#future-directions)
- [Conclusion](#conclusion)
- [Recommand books](#recommand-books)
- [Reference](#reference)

#### **Introduction**

Quality Assurance (QA) Testing needs to be done on Dream Big application. Therefore, some research was done based on the topic of QA Testing. The definition of QA Testing, its importance, different types of testing and QA Testing’s relationship with Agile was researched. Planning for testing and further direction for Dream Big application were also considered. 

#### **What is QA testing**

According to (Tamilarasi and Prasanna, 2019), QA Testing stands for Quality Assurance Testing. Which is a process of making sure one’s product is of the ‘highest possible quality’. QA testing is the use of simple techniques to prevent potential issues and ‘ensure great user experiences’. 

#### **Why is QA testing needed?**

One of the famous examples of unsuccessful QA testing is the thousand-year bug. The developers back then were formatting and saving date data by 2 digits to save money. Which means only showing the final two digits of the year. This makes the year 2000 almost identical to 1900. 

To learn from this incident, nowadays, people take great care of QA Testing. The testers need to know what should be tested and what should be output to achieve the best result.

#### **Different types of QA test**

There are two domains of QA tests, the manual QA test and the Automated QA Test. Each with its own pros and cons. (Global App Testing, 2019) mentioned differences between Manual QA Tests and Automated QA Tests:

- Manual QA Test
    - Wide range of conditions and scenarios
    - Great feedback from testers
    - Time-consuming and need skilled and experienced people to run the test
    - Can be tested on a range of devices, operating systems and different user profiles
    - Exploratory tests, usability tests and ad hoc tests

` `  
- Automated QA Test
    - Does repeat work
    - Little to no feedback
    - Saves time, money, and human resources by running auto
    - Only stable systems and regression testing
    - White box tests, load tests and performance tests

Each domain of QA Tests has its  own techniques. Please see section [Definations](#quality-assurance-definitions) for detail.

#### **QA test with Agile?**

According to (Global App Testing, 2019), QA testing should be fitting into a series of cycles and be run as a part of the cycle. Designers and developers should have discussions with the QA team to get everyone to know what should be happening. 
Auto QA test should be run in each cycle based on its high speed, and manual QA tests could be run after key design or big updates to have detailed feedback. That feedback should be taken into the design and development process for better updates. 

#### **Planning for QA testing**

Developers should be writing tests; however, they could be writing tests that meet their needs out of bias. Therefore, some developers only write testing plans and hand over the job to dedicated engineers or outsourced groups. 

When writing the testing plans, the tests should have:

- Clear steps to follow. Each step is asking one question about the function's ability, the result should be either fail or run. 
- Clear expectations and measurable outcomes.

According to (Global App Testing, 2019), there are a few points to follow in QA Testing:

- One thing at a time (either testing on UI or privacy)
- UI needs manual tests for feedback
- Understand the type of testing on offer (knowing what is being tested and how to use them)
- Always test old features when new code is added
- Report and track bugs
- Leverage analytics, and keep records to  easily refer to what bug is likely to occur
- Choose different environments (different OS, devices, and user profiles)
- Unit and integration tests (Unit test: isolate components) (Integration test: whole subsystem work)

#### **Mock Tests**

Please see section [Testing steps](#quality-assurance-testing-steps) for detail.

#### **Documenting the tests**

According to (AltexSoft, 2020), the core elements of testing plans are:

- Attributes (the main purpose of testing, what needs to be checked)
- Components (what are we testing)
- Capabilities (What a user should be doing)

Therefore, a QA Testing template document is developed based on (AltexSoft, 2020) and (2022)’s work. Please see section [Testing Tables](#quality-assurance-testing-tables) for detail.

#### **Future directions?**

Only Quality Assurance is being considered our testing step. For further potential action that could be used to improve product quality, System Administration (SA) and Vulnerability Assessment (VA) could be used. 

According to (Takanen et al., 2018), SA is an action that is similar to QA, it also tests and secures software, but it is based on one’s own environment. For VA, it is the action that tests the software by breaking into it from a different user profile. 

#### **Conclusion**

The definition of QA Testing is defined in this document, and detailed research on types of QA Testing and how the Dream Big Technical team should apply them was discussed. Some further directions and relevant books were also commented on.

#### **Recommand books**

*Fuzzing for Software Security Testing and Quality Assurance, Second Edition* (Takanen et al., 2018). This book listed attacking methods in chapter 2, and different ways of testing in chapter 3. 

*Software quality engineering: testing, quality assurance, and quantifiable improvement* (Tian, 2005). This book roughly described the general concept of quality assurance in chapter 3, part 1, and the idea of software testing in part 2.

#### **Reference**

2022.Sample Test Case Template with Test Case Examples [Download] [Online]. Software Testing Help Available: https://www.softwaretestinghelp.com/test-case-template-examples/ [Accessed].

ALTEXSOFT. 2020. Software Testing Explained: How QA is Done Today [Online]. YouTube. Available: https://www.youtube.com/watch?v=oLc9gVM8FBM [Accessed].
FUNCTIONIZE. 2021. Automated testing [Online]. Online. Available: https://www.functionize.com/automated-testing [Accessed].

GLOBAL APP TESTING. 2019. Best Practices for QA Testing [Online]. Online. Available: https://www.globalapptesting.com/best-practices-for-qa-testing [Accessed].

GLOBAL APP TESTING. 2020. Manual Testing - what is it? [Online]. Available: https://www.globalapptesting.com/manual-testing-best-practices [Accessed].

TAKANEN, A., DEMOTT, J. D., MILLER, C. & KETTUNEN, A. 2018. Fuzzing for software security testing and quality assurance, Artech House.

TAMILARASI, T. & PRASANNA, M. 2019. Research and Development on Software Testing Techniques and Tools. Advanced Methodologies and Technologies in Network Architecture, Mobile Computing, and Data Analytics. IGI Global.

TIAN, J. 2005. Software quality engineering: testing, quality assurance, and quantifiable improvement, John Wiley & Sons.






[comment]: # (The Links for all the referencing)

[1]: <https://deakin365-my.sharepoint.com/:w:/g/personal/xtjing_deakin_edu_au/EcWqZfA5ugpCrLsOzuv6GlYBZhKK48vq9IUvNp5FLEp_tA?e=99v9t0> "QA Defination & Testing steps"

[2]: <https://deakin365-my.sharepoint.com/:w:/g/personal/xtjing_deakin_edu_au/EWEzHdGRWxZBnWQjB_5pHAAB8TVNnJJDAWD35nzoxG_RBA?e=z3Tdeb> "QA Testing Tables"

[3]: <https://deakin365-my.sharepoint.com/:b:/g/personal/xtjing_deakin_edu_au/EfFYHs9C6vxMrRlpjyscDDEBEGuabZY6mNsYWWw1yQQf2A?e=yKvuqS> "QA Research"