# Why use it?
job korea에 검색 조건 중에,\
몇일 안에 모집공고가 마감된다는 필터는 없다.\
수백개의 공고 중에서, 마감일이 오늘, 내일까지인 것만 추려보고 싶다.


# How to use it?
1. git clone https://github.com/Doohwancho/jobkorea-crawling.nodejs
2. npm install
3. crawl-job.korea.js의 main() 파라미터에 원하는 검색 조건 입력
4. node crawl-job-korea.js


# credit
개발자의 품격
https://www.youtube.com/watch?app=desktop&v=yaeZ17QYxVs


# Todo
1. fix: filter duplicates by 'jobTitle' -- clear
2. refactor: anti pattern - stop use object as database. use set instead -- clear
3. fix: 연관 없는 추천회사가 결과에 포함되던 버그 수정 -- clear
4. refactor: util function modularize -- clear
5. fix: 상시채용 filter되는 버그 -- clear
6. feat: executable command line 
7. feat: javascript -> typescript
8. feat: jsodocs