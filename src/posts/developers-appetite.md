---
title: 'Developers’ appetite for open source fuels the cloud wars'
description: 'Yesterday, Stratechery’s Ben Thompson wrote a thought provoking article about the current AWS / MongoDB kerfuffle that’s been keeping the open source community’s echo chamber humming for the past couple of weeks.'
intro: ""
ogImage:
date: 2019-01-16
image:
  src: './src/assets/images/posts/Paper.From_laggard_to_powerhouse.1.png'
	alt: "Illustration"
---

Yesterday, Stratechery’s Ben Thompson wrote a [thought provoking article](https://stratechery.com/2019/aws-mongodb-and-the-economic-realities-of-open-source/) about the current AWS / MongoDB kerfuffle that’s been keeping the open source community’s echo chamber humming for the past couple of weeks.

It’s refreshing to have an outsider’s perspective on the topic.

It’s a great piece and you should absolutely read it. His comparison with the music industry is particularly apt.

## Can AWS afford not to support its ecosystem?

Today, Thompson published a follow-up where he paints a sombre outlook for the business perspective of open source software providers like Redis Labs and MongoDB Inc., wondering whether it is in the long-run interest of AWS to support these companies through revenue sharing:

<custom-pullquote>Still, you could argue that it would be in the long-run interest of the public cloud providers to keep in mind the old Microsoft view of platforms: they are the most successful when everyone is making money, not simply the platform provider. […] AWS is better because software like Redis exists; is it in AWS’ long-run interest to effectively take away Redis Labs’ revenue?</custom-pullquote>

Thompson then looks at Facebook’s attitude towards its platform ecosystem and compares it to Microsoft’s, pitting Facebook’s purely digital ecosystem against Microsoft’s then partially brick and mortar one, arguing that Microsoft didn’t support theirs through clairvoyance, but through sheer necessity. A necessity neither shared by Facebook nor AWS — still according to Thompson — as both have an “all-digital ecosystem.”

<custom-pullquote>I’m reminded of Facebook and the news: I thought for a long time the company would move more quickly when it came to sharing advertising revenue with high-quality content organizations that made Facebook better to use because it would be in their long-term interest. If anything, though, the company went in the opposite direction, not only not sharing revenue but also de-prioritizing products like the Facebook Audience Network; the short-term revenue incentives were simply too strong.</custom-pullquote>

<custom-pullquote>Indeed, the truth is that while old-school Microsoft may indeed have only taken a minority of the money in its market, that was because its partners, from resellers to systems integrators to developers, were genuinely useful to the company, doing things Microsoft could not; they were earning their revenue, not being gifted it by Redmond (and certainly the company didn’t show much concern for those on its platform occupying niches Microsoft wanted for itself).</custom-pullquote>

<custom-pullquote>In other words, the reason why Facebook may be less generous to its ecosystem than old-school Microsoft may have less to do with Microsoft’s leadership being uniquely enlightened and more to do with it simply being the natural state of affairs in Facebook’s all-digital ecosystem that Facebook take all the rents.</custom-pullquote>

<custom-pullquote>And, if that is true, it follows that AWS, absent a level of vision and concern for its suppliers that it frankly has never demonstrated, is unlikely to ever consider sharing.</custom-pullquote>

<custom-pullquote>Still, you could argue that it would be in the long-run interest of the public cloud providers to keep in mind the old Microsoft view of platforms: they are the most successful when everyone is making money, not simply the platform provider. […] AWS is better because software like Redis exists; is it in AWS’ long-run interest to effectively take away Redis Labs’ revenue?</custom-pullquote>

This morning, minutes after Thompson released his follow-up, Facebook announced a $300M pledge to support journalism. I imagine this will prompt Thompson to release a follow-up to his follow-up tomorrow morning, in which he’ll argue that Facebook is changing course not because keeping its ecosystem alive is critical to its business, but because it was pressured into doing so. He won’t be wrong. But that’s beside the point.

Of course, Facebook’s announcement undermines Thompson’s argument, but it wouldn’t have held regardless of this unfortunate news clash.

Facebook has been able to avoid sustaining its ecosystem because it is a quasi monopoly, not because its ecosystem is all-digital. That is not the case of AWS, which is aggressively pursued by three tech titans: Google, Microsoft, and IBM.

## Capturing developer mindshare through open source contribution

In his book _The New Kingmakers_, Stephen O’Grady retraces the shift from top-down to bottom-up adoption of enterprise software. Whereas a decade ago, enterprise software was purchased by executives and dumped on developers, that is no longer the case. Today, developers chose their stack during prototyping and development. Obviously, the same stack makes it to production more often than not. Why would you pick a different solution than the one you already, tested, learned, and implemented? For software and cloud providers alike, this shift is why developer mindshare has become so important, and — given developers’ appetite for open source (who can say no to free, well documented on StackOverflow, and easily modifiable?) — why adopting an open source-friendly strategy has become the norm.

AWS’s contenders know this very well and are going all in on open source with the hope of capturing developer mindshare.

Under the enlightened direction of Satya Nadella — who famously declared his love for Linux in a complete U-turn over his predecessor’s stance that “Linux is a cancer” — Microsoft has completely reversed course on open source. After adding Linux support to its initially Windows-only cloud offering in 2012, Microsoft doubled down on open source last year.

First, it acquired GitHub for $7.5B, with the hope of gaining developer mindshare and, why not, use it to onramp developers on to its Azure platform. Secondly, it licensed key part of its patent portfolio to the Open Invention Network, relinquishing an estimated $2B a year in patent royalty in order to secure a leadership position in open source and the hearts, minds, and buying power of developers.

IBM, not to be outdone, purchased Red Hat for an astounding $34B, leapfrogging its way back into relevance.

And as for Google, it continued investing heavily — and very successfully — in cloud-related open source areas, notably AI (through TensorFlow) and container orchestration (with Kubernetes).

## Even if AWS’s future strategy is open source-based, OSS providers will need a different business model

In that context, it is not surprising that AWS has been considerably upping its open source game over the last few months and will probably continue doing so for the foreseeable future. If it wants to keep its market share, AWS can’t afford to lose developer mindshare to the competition. So expect it to invest heavily in the open source space over the next couple of years or it’ll see its market share plateau.

But will that change its attitude towards Redis Labs, MongoDB Inc., and other open source software suppliers? That depends how well these companies play their cards. Can they sway developers in their favor despite an often less than stellar reputation in the community? Are they ready and willing to undertake the important strategic and cultural changes that it would require? Can they convince AWS of their critical role in its ecosystem? Would such a role be worth to AWS the kind of money that these VC-backed companies aspire to? I’m not so sure.

There are other, more creative ways AWS can help its ecosystem thrive if what it’s after is developer mindshare. First of all, it can increase its contribution to open source (and actually showcase the work it does, something it hasn’t been very good at doing so far). Secondly, it can invest in open source communities, by sponsoring events, providing infrastructure, funding travel, creating a diversity funds, etc. Thirdly, it can invest in smaller, non VC-backed projects, through OpenCollective, similar platforms, or—why not?—a dedicated fund it would create. Fourthly, AWS could launch a platform/market place to foster mutualization of open source software development, the output of which could then be fast-tracked to its cloud offering. And of course, there’s alway the possibility of an acquisition; npm Inc. and GitLab Inc. both come to mind.

Will AWS end-up sharing its revenue stream with open source software providers? I really doubt it. But will it invest seriously in the open source ecosystem? Absolutely. It’s the key to developer mindshare and thus, software adoption.
