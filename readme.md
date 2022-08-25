# Why use it?
job korea에 검색 조건 중에,\
몇일 안에 모집공고가 마감된다는 필터는 없다.\
수백개의 공고 중에서, 마감일이 오늘, 내일까지인 것만 추려보고 싶다.


# How to use it?
1. git clone https://github.com/Doohwancho/jobkorea-crawling.nodejs
2. npm install
3. node main.js ${keyword} ${deadline}

Example

> node main.js 라즈베리파이 7

-> 라즈베리파이로 검색 후, 채용 마감일이 7일 이내이거나 상시채용인 회사 리스트 출력

# credit
개발자의 품격
https://www.youtube.com/watch?app=desktop&v=yaeZ17QYxVs


# Todo
1. fix: filter duplicates by 'jobTitle' -- clear
2. refactor: anti pattern - stop use object as database. use set instead -- clear
3. fix: 연관 없는 추천회사가 결과에 포함되던 버그 수정 -- clear
4. refactor: util function modularize -- clear
5. fix: 상시채용 filter되는 버그 -- clear
6. feat: executable command line -- clear
7. feat: sort by dueDate desc -- clear
8. refactor: modularize -- clear
9. feat: jsdocs -- clear
10. feat: javascript -> typescript