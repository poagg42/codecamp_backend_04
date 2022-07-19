import cheerio from 'cheerio'
import axios from 'axios'

export async function getOpenGraph(contents) {

    const openGraph = {
        title: '',
        description: '',
        image: ''
    }

    if (contents.includes('http')) {
        let myHttpOg = ''
        contents.split(' ').forEach((el) => {
            if (el.startsWith('http')) {
                myHttpOg = el
            }

        })

        const html = await axios.get(myHttpOg)
        console.log(html.data)

        const $ = cheerio.load(html.data)
        $('meta').each((_, el) => {
            if (!$(el).attr('property')) return // 없으면 종료

            console.log($(el).attr('property').split(':')[1])
            console.log($(el).attr('content'))
            console.log('=======================')

            const key = $(el).attr('property').split(':')[1]
            const content = $(el).attr('content')
            openGraph[key] = content
        })

        console.log('결과', openGraph)
        return openGraph
    }
}  // 스크래핑과 REST API 해야 된다.

// const contents = '여기 정말 좋아요! 한번 꼭 놀러오세요! https://naver.com'
// getOpenGraph(contents)