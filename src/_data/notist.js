const eleventyFetch = require("@11ty/eleventy-fetch");
const jsdom = require("jsdom");
const Turndown = require("turndown");
const td = new Turndown();
const { JSDOM } = jsdom;

async function cachedFetch(url, type) {
    return eleventyFetch(url, {
        duration: "*",
        type: type,
        directory: "src/_cache"
    });
}

const eventSlugs = {
    "state-of-open-con": "state-of-open",
    "fosdem-2024": "fosdem",
    "ospo-onramp": "ospo-onramp",
    "open-source-experience": "osxp",
    "w3c-workshop-secure-the-web-forward": "w3c-workshop",
    "upstream": "upstream",
    "european-commission-open-source-workshops-for-computing-sustainability": "eu-commission",
    "contributing-today": "contributing-today",
    "open-edx-conference": "open-edx",
    "foss-backstage": "foss-backstage",
    "seagl": "seagl",
    "all-things-open": "ato",
    "ospocon": "ospocon",
    "practical-open-source-information": "posi",
    "europython": "europython",
    "ow2con": "ow2con",
    "openjs-world": "openjs-world",
    "fossasia-summit-2021": "fossasia",
    "fosdem21": "fosdem",
    "kubecon-cloudnativecon": "kubecon",
    "sfscon": "sfscon",
    "online-cto-summit-onboarding-and-retention": "cto-summit",
    "open-source-summit-europe": "ossummit",
    "dinacon": "dinacon",
    "open-infrastructure-summit": "openinfra",
    "ansiblefest": "ansiblefest",
    "paris-web": "paris-web",
    "state-of-the-source-summit": "state-of-the-source",
    "open-source-101": "open-source-101",
    "openchain-webinar": "openchain",
    "all-things-open-rtp-meetup": "ato-meetup",
    "openexpo-europe": "openexpo",
    "finos-open-source-readiness": "finos",
    "fosdem": "fosdem",
    "open-source-strategy-forum": "ossf",
    "all-things-open-2019": "ato",
    "amp-contributor-summit": "amp-contributor-summit",
    "ow2con19": "ow2con",
    "innersource-commons-spring-summit-2019": "innersource-commons",
    "genevaweb": "genevaweb",
    "decision-making-in-standard-developing-organisations-for-the-internet": "decision-making-in-sdos"
}

const slugs = {
    "1-billion-dollars-for-open-source-maintainers": "1-billion",
    "40-new-ways-the-cra-can-accidentally-harm-open-source": "cra-standards",
    "a-home-for-your-open-source-project": "home",
    "bringing-ethics-back-to-open-source": "ethics",
    "build-and-leverage-your-open-source-culture-to-recruit-retain-and-foster-top-talent": "recruit-retain-foster",
    "can-securing-jquery-help-secure-the-web-forward": "secure-the-web-forward",
    "does-open-source-need-its-own-priority-of-constituencies": "priority-of-constituencies",
    "from-laggard-to-open-source-power-house": "laggard-to-powerhouse",
    "from-laggard-to-open-source-power-house-a-transformative-journey-to-successfully-build-a-strong-open-source-culture": "laggard-to-powerhouse",
    "from-laggard-to-open-source-powerhouse": "laggard-to-powerhouse",
    "governance-update-next-steps": "amp-update",
    "keynote-from-open-governance-to-collective-ownership": "open-edx-keynote",
    "making-the-business-case-for-contributing-to-open-source": "business-case",
    "measuring-contribution-to-open-source": "measuring-contributions",
    "now-more-than-ever-ospo-alignment-with-org-strategy-is-key": "ospo",
    "open-source-contribution-policies-that-don-t-suck": "contribution-policies",
    "open-source-contribution-policies-that-dont-suck": "contribution-policies",
    "open-source-contribution-policies-that-empower-not-stifle": "contribution-policies",
    "open-source-foundations-dark-knights-or-super-heroes": "dark-knights-or-super-heroes",
    "oss-funding-sponsorships": "oss-funding",
    "recruit-retain-foster": "recruit-retain-foster",
    "round-table-financing-critical-open-source-software": "financing-critical-infrastructure",
    "sdos-as-de-facto-do-ocracies-how-standards-are-really-made": "do-ocracies",
    "sustainability-and-security-its-time-to-connect-the-dots": "connect-the-dots",
    "the-software-is-provided-as-is": "as-is",
    "towards-a-sustainable-solution-to-open-source-sustainability": "sustainability",
    "what-is-open-source": "what-is-open-source",
    "what-value-do-open-source-management-consultants-add": "management-consultants",
    "why-contribute-to-open-source": "why-contribute",
    "y-a-t-il-de-la-place-pour-lethique-dans-lopen-source": "ethics-fr"
};

const videoIndex = {};

async function getDocument(url) {
    const html = await cachedFetch(url, "text");
    return new JSDOM(html).window.document;
}

function toMarkdown(html) {
    return td.turndown(html);
}

function clone(obj) {
    console.log(obj)
    return JSON.parse(JSON.stringify(obj));
}

module.exports = async function() {
    const videos = [];
    const conferences = {};
    const index = await getDocument("https://noti.st/tobie/videos");
    for (let fig of index.querySelectorAll("figure")) {
        let a = fig.querySelector("a");
        let video = {
            placeholder: fig.querySelector("img")?.src,
            title: fig.querySelector("figcaption").firstChild.textContent.trim(),
            date: fig.querySelector("time").getAttribute("datetime") 
        };
        
        if (a) {
            video.notistUrl = "https://noti.st/tobie" + a.href;
        }
        
        const doc = await getDocument(video.notistUrl);
        video.notistId = doc.querySelector("p.subhead a").href.split("/")[1];
        video.embedUrl = doc.querySelector("iframe").src;
        
        const embed = await getDocument(video.embedUrl);
        
        if (embed.querySelector("iframe")) {
            video.url = embed.querySelector("iframe").src;
            video.host = "external";
        } else if (embed.querySelector("source")) {
            video.url = embed.querySelector("source").src;
            video.host = "self";
        }    
        videoIndex[video.notistId] = video;
    }

    
    const json = await cachedFetch("https://noti.st/tobie.json", "json");
    const indexData = json.data[0].relationships.data;
    const presentations = [];
    for (const indexD of indexData) {
        let pres = await cachedFetch(indexD.links.related, "json");
        console.log(pres)
        pres = pres.data[0];
        let event = pres.relationships.data[0].attributes;
        const notistID = pres.id.replace("pr_", "");
        const notistSlug = pres.attributes.slug;
        const year = indexD.attributes.presented_on.substr(0, 4);
        const slug = slugs[notistSlug]
        if (!slug) {
            throw new Error("Missing slug for " + notistSlug);
        }
        
        const eventSlug = eventSlugs[event.slug];
        if (!eventSlug) {
            throw new Error("Missing slug for event " + eventSlug);
        }
        
        const eventObj = {
            name: event.title,
            notistSlug: event.slug,
            slug: `${ year }/${ eventSlug }`,
            startDate: event.starts_on,
            endDate: event.ends_on,
            address: event.address,
            lat: event.latitude,
            long: event.longitude,
            countryCode: event.country_code,
            url: event.url
        };
        const obj = {
            title: indexD.attributes.title,
            date: indexD.attributes.presented_on,
            timezone: indexD.attributes.timezone,
            image: indexD.attributes.image,
            notistSlug: notistSlug,
            notistID: notistID,
            talkSlug: slug,
            slug: `${ year }/${ eventSlug }/${ slug }`,
            year: year,
            notistUrls: [
                pres.links.self,
                pres.links.self.replace(notistSlug, ""),
                pres.links.self.replace("/" + notistSlug, ""),
            ],
            desc: toMarkdown(pres.attributes.blurb.html),
            event: clone(eventObj),
            pdf: pres.attributes.download,
            video: videoIndex[notistID] ? clone(videoIndex[notistID]) : undefined,
            slidedeck: pres.attributes.slidedeck?.data[0].slides.map(s => {
                const obj = { url: s.image };
                if (s.title) {
                    obj.title = s.title;
                }
                if (s.desc?.html) {
                    obj.desc = toMarkdown(s.desc.html);
                }
                return obj;
            }),
            resources: pres.attributes.resources?.data.map(r => {
                const obj = { url: r.url };
                if (r.title) {
                    obj.title = r.title;
                }
                if (r.desc?.html) {
                    obj.desc = toMarkdown(r.desc.html);
                }
                return obj;
            })
        };
        conferences[eventObj.slug] = conferences[eventObj.slug] || [];
        conferences[eventObj.slug].push(clone(obj));
        presentations.push(obj);
        if (videoIndex[notistID]) {
            videoIndex[notistID].event = clone(eventObj);
            videoIndex[notistID].slug = `${ event.slug }/${ slug }`;
            videos.push(videoIndex[notistID])
        }
    }
    
    return {
        presentations,
        videos,
        conferences
    };
};
