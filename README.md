# CUSchedule
CU Enhanced Schedule Viewer

https://7ur.it/CUSchedule/?term=Spring-2019&classes=csci3832-001,csci4318-100,csci4318-101,geol1010-641,geol1020-640

## what this is:

Weekly schedule viewer that interfaces with the [classes.colorado.edu](https://classes.colorado.edu) api. Loads academic records **[[1]](#1-academic-records)** for a given oauth token 


TIL there's a printer friendly view of https://isis-cs.prod.cu.edu/psc/csprod/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL that actually does render everything _okay_.

## how this works:

will cache in sessionStorage

probably will just expect a list of courses including sections and a term then will grab further information from classes.colorado.edu

annoying that you have to go through mycuinfo at all but at least it will work. oauth is probably simpler but i guess both options are needed. i wonder if entering them manually is what it should "expect" but then it will provide the two ways to make it faster lol. i guess even if you do load via oauth you still should set the term and classes search params.

classes.colorado.edu gives you jquery, d3, sam(oauth), and a very friendly api to the database of the courses and to a user's academic history.

This was originally intended to be a bookmarklet or something to run in the console. Running it in the console isn't great for the user, and same for the bookmarklet tbh. The bookmarklet would need to load the (rather large) file over the network (which would have been fine but I would have had to be explicit that that was happening) and would have had to execute code directly on the website (which is maybe not okay).


## to implement:

- actually previous term's information seems broken cause it only says the courses you took not which time slot you took them at hmmmm
- have more involved process to render older schedules (or if classes.colorado.edu fails to get your correct course information for a given term) where i link to https://isis-cs.prod.cu.edu/psc/csprod/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL telling them to continue with any term then they go to a representative week and they run a script to gather information which is used to match information in the classes.colordao.edu databases (they have to tell me which term it's for for me to look the classes up in the right srcdb)
- update from previous repo's notes
- present trust and security disclaimer on the site
- better ui/ux for providing oauth token
- letting you add custom weekly recurring events with a simple 
- exporting to svg / png / pdf (though chrome's pdf saver may be enough)
- letting you load the schedule for a custom term (involves looking up what srcdb's there are)
- letting you add or remove courses from it (have to have some way of querying available courses)
- cache in sessionStorage
- provide permanent link to load schedule in addition to temporary
- be able to request a temporary link that doesn't expose your oauth token


## trust / security:

This website operates on a trust based security model. It simply asks the user for a temporary oauth token to fetch their academic records **[[1]](#1-academic-records)**. This token will go through cors-anywhere. Since the token is temporary and restricted in scope I see no issues with this. However, it is important that the user knows what is happening and trusts the services involved.

```
if you trust https://github.com/Rob--W/cors-anywhere and
https://classes.colorado.edu and this repository / website,
you may provide your oauth token from the resulting url of visiting
https://ping.prod.cu.edu/as/authorization.oauth2
				?client_id=CUBoulderClassSearch
				&response_type=token
				&IdpSelectorId=BoulderIDP
				&scope=AcademicRecords
				&redirect_uri=https://classes.colorado.edu/sam/oauth.html
	(https://ping.prod.cu.edu/as/authorization.oauth2?client_id=CUBoulderClassSearch&response_type=token&IdpSelectorId=BoulderIDP&scope=AcademicRecords&redirect_uri=https://classes.colorado.edu/sam/oauth.html)
and this site will be able to use the token to query your course history
to be able to present your weekly schedule for a given term.

the tokens should only be valid for 2 hours (ensure &expires_in=7199 seconds in resulting url)
and will only provide access to academic records (ensure &scope=AcademicRecords in requesting url).

please ensure you trust these services and be aware that if you give someing a link that
includes your token, they will be able to access your academic records while the token is valid.

this is an example of how your token will be used on this site
	(with a get or post request to the classes.colorado.edu api):
		[https://cors-anywhere.herokuapp.com +]
		 https://classes.colorado.edu/api/?page=sisproxy&oauth_token=8ZuiuPxrjWRkX3v5BVy6QBIzPOyQ
```

---

#### [1] academic records:

The academic records that the oauth token gives access to should be assumed to be everything that is visible on [classes.colorado.edu](https://classes.colorado.edu) after logging in, if not a bit more. This website will only use the result of an academic record fetch (see below) to find the courses taken for a given term ()

This is an example of an academic record fetch (you can see your own if you run `sam.login()` then `sam.fetchRecord()` on [classes.colorado.edu](https://classes.colorado.edu)):

```
{
  cart: Array(10)
  0: "2177|default|14878|||"
  1: "2177|default|14880|||"
  2: "2177|default|17252|||"
  3: "2177|default|21478|||"
  4: "2177|default|24501|||"
  5: "2177|default|26072|||"
  6: "2177|default|27971|||"
  7: "2177|default|34786|||"
  8: "2191|default|31026|||"
  9: "2191|default|36818|||"
  length: 10
  __proto__: Array(0)
  hist:
  2167: (5) ["CSCI 2824||", "MATH 2001||", "APPM 3570||STAT 3100", "CSCI 2270||", "APPM 2350||MATH 2400"]
  2171: (6) ["CSCI 2400||", "PHYS 1140||", "CSCI 3308||", "PHYS 2130||PHYS 2170", "CLAS 4120||CLAS 5120,HUMN 4120", "CSCI 3104||"]
  2177: (5) ["CSCI 3753||", "CSCI 3155||", "MATH 4730||MATH 5730", "CSCI 3656||", "HUEN 3350||"]
  2181: (5) ["CSCI 3202||", "CSCI 4830||", "CSCI 3403||", "CSCI 4831||", "CSCI 4593||ECEN 4593"]
  2187: (6) ["CSCI 4229||CSCI 5229", "CSCI 4308||", "CSCI 4273||CSCI 5273,ECEN 5273", "PHYS 3050||", "CSCI 3434||", "CSCI 4253||CSCI 5253"]
  __proto__: Object
  pers:
  clas: "45"
  cur: Array(8)
  0: {career: "UGRD", code: "CSEN-BSCS", effdt: "2019-01-14", term: "2191", status: "AC"}
  1: {career: "UGRD", code: "MATH-MIN", effdt: "2019-01-14", term: "2191", status: "AC"}
  2: {career: "UGRD", code: "CSEN-BSCS", effdt: "2019-02-21", term: "2194", status: "AC"}
  3: {career: "UGRD", code: "MATH-MIN", effdt: "2019-02-21", term: "2194", status: "AC"}
  4: {career: "UGRD", code: "CSEN-BSCS", effdt: "2019-02-21", term: "2197", status: "AC"}
  5: {career: "UGRD", code: "MATH-MIN", effdt: "2019-02-21", term: "2197", status: "AC"}
  6: {career: "UGRD", code: "CSEN-BSCS", effdt: "2019-02-21", term: "2201", status: "AC"}
  7: {career: "UGRD", code: "MATH-MIN", effdt: "2019-02-21", term: "2201", status: "AC"}
  length: 8
  __proto__: Array(0)
  fn: "Michael"
  id: "tJEyJCDfA+rGIZdizyOMnA=="
  inst: false
  __proto__: Object
  reg:
  2187: ["CSCI 4308|16990|"]
  2191: (3) ["CSCI 4318|30139|", "CSCI 4318|29103|", "CSCI 3832|38088|"]
  __proto__: Object
  waitlist: {"": Array(0)}
}
```

TODODODO
properly see if there's anything else you get get with the oauth token. i don't think so but i have no idea what the id in that response is for