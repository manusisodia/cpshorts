import Head from 'next/head'
import { useState, useEffect } from 'react'



export default function Home() {
  const [taglist, setTagList] = useState([])
  const [lowerLimit, setLowerLimit] = useState(Number(0))
  const [upperLimit, setUpperLimit] = useState(Number(0))
  const [problemList, setProblemList] = useState([])

  const selectTag = e => {
    // remove duplicates from an array
    const tags = taglist.filter(t => t !== e.target.value)
    setTagList([...tags, e.target.value])
  }

  const changeLowerLimit = e => {
    setLowerLimit(Number(e.target.value))
  }
  const changeUpperLimit = e => {
    setUpperLimit(Number(e.target.value))
  }

  const generateProblemList = async () => {
    if (lowerLimit > upperLimit) {
      alert(
        `Lower limit (${lowerLimit}) is greater than upper limit (${upperLimit})`,
      )
      return
    }
    let tags = ''
    taglist.forEach(tag => {
      tags += tag + ';'
    })
    const url = `https://codeforces.com/api/problemset.problems?tags=${tags}`
    const response = await fetch(url).catch(err => console.log(err))
    const problems = await response.json()
    const op = await problems.result.problems
    const randProbList = []
    for (let i = 0; i < op.length; i++) {
      if (op[i].rating !== undefined) {
        if (
          (op[i].rating >= lowerLimit &&
            op[i].rating <= upperLimit) ||
          lowerLimit === 0 ||
          upperLimit === 0
        ) {
          randProbList.push(op[i])
        }
      }
    }
    if (randProbList.length === 0) {
      alert(`No problems found for the given tags`)
    } else {
      let bs = document.querySelector('.card')
      let bt = document.querySelector('.but')
      bs.style.display = 'block';
      bt.style.display = 'flex';
      const randProb = []
      for (let i = 0; i < randProbList.length; i++) {
        const randomIndex = Math.floor(
          Math.random() * randProbList.length,
        )
        randProb.push(randProbList[randomIndex])
        randProbList.splice(randomIndex, 1)
      }
      setProblemList(

        randProb.map(p => {
          const url = `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`
          return (
            <div
              style={{
                height: '100%',
                width: '100%',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(to right,#10002b 0%,#10002b 50%,#14213d 50%,#14213d 100%)',

              }}
              className="problems">
              <h2 style={{ color: '#fff', fontFamily: 'poppins', letterSpacing: '3px', textTransform: 'uppercase', }}>
                {p.index}. {p.name}
              </h2>

              <p style={{ color: '#fff' }}>
                <b style={{ color: '#fff' }}>Rating: </b>
                {p.rating}
              </p>
              <p style={{ color: '#fff' }}>
                <b style={{ color: '#fff' }}>Tags: </b>
                {p.tags.map(t => t + ', ')}
              </p>
              <div style={{
                width: '150px', height: '30px', borderRadius: '15px', display: 'flex', justifyContent: 'center', border: '3.5px solid #15f4ee',
                transition: '1.5s', background: 'black',
              }}><a key={p.contestId.toString() + p.index} href={url} target="_blank"
                style={{
                  textDecoration: 'None', color: '#15f4ee',
                  fontFamily: 'poppins',
                  fontWeight: '400',
                  textTransform: 'capitalize',
                }}>READ & SOLVE</a></div>
            </div>
          )
        }),
      )
    }
  }
  const bpre = () => {
    let box = document.querySelector('.card')
    let h = box.clientHeight;
    box.scrollTop = box.scrollTop - h;
  }
  const bnxt = () => {
    let box = document.querySelector('.card')
    let h = box.clientHeight;
    box.scrollTop = box.scrollTop + h;
  }

  return (
    <div className="container">
      <Head>
        <title>CP Shorts</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href=".\icon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />


      </Head>

      <main>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div>
        <h1 className="title" >
          <a href="/" style={{ fontFamily: 'Permanent Marker', }}>CP Shorts</a>
        </h1>
        </div>
        <h2 style={{ marginTop: '3rem', fontFamily: 'lato', letterSpacing: '8px', color: '#fff', textTransform: 'uppercase', }}>Rating Range</h2>
        <div className="rating-sel">
          <input style={{ border: '3px solid black', }}
            className="rating-field"
            type="number"
            value={lowerLimit}
            onChange={changeLowerLimit}
          />
          <span> - </span>
          <input style={{ border: '3px solid black', }}
            className="rating-field"
            type="number"
            value={upperLimit}
            onChange={changeUpperLimit}
          />
        </div>
        <div className="warning">
          {lowerLimit > upperLimit
            ? "Upper limit can't be lesser than lower limit"
            : ''}
        </div>
        <select className="tags" onChange={selectTag} defaultValue="" style={{ fontFamily: 'poppins', textTransform: 'uppercase', textAlign: 'center', border: '2px solid black',color:'#15f4ee',background:'black',border: '5px solid #15f4ee', }}>
          <option value="" disabled>
            select your desired tags
          </option>
          <option  value="2-sat" title="2-satisfiability">
            2-sat
          </option>
          <option value="binary search" title="Binary search">
            binary search
          </option>
          <option value="bitmasks" title="Bitmasks">
            bitmasks
          </option>
          <option value="brute force" title="Brute force">
            brute force
          </option>
          <option
            value="chinese remainder theorem"
            title="Сhinese remainder theorem">
            chinese remainder theorem
          </option>
          <option value="combinatorics" title="Combinatorics">
            combinatorics
          </option>
          <option
            value="constructive algorithms"
            title="Constructive algorithms">
            constructive algorithms
          </option>
          <option
            value="data structures"
            title="Heaps, binary search trees, segment trees, hash tables, etc">
            data structures
          </option>
          <option value="dfs and similar" title="Dfs and similar">
            dfs and similar
          </option>
          <option
            value="divide and conquer"
            title="Divide and Conquer">
            divide and conquer
          </option>
          <option value="dp" title="Dynamic programming">
            dp
          </option>
          <option value="dsu" title="Disjoint set union">
            dsu
          </option>
          <option
            value="expression parsing"
            title="Parsing expression grammar">
            expression parsing
          </option>
          <option value="fft" title="Fast Fourier transform">
            fft
          </option>
          <option value="flows" title="Graph network flows">
            flows
          </option>
          <option value="games" title="Games, Sprague–Grundy theorem">
            games
          </option>
          <option
            value="geometry"
            title="Geometry, computational geometry">
            geometry
          </option>
          <option
            value="graph matchings"
            title="Graph matchings, König's theorem, vertex cover of bipartite graph">
            graph matchings
          </option>
          <option value="graphs" title="Graphs">
            graphs
          </option>
          <option value="greedy" title="Greedy algorithms">
            greedy
          </option>
          <option value="hashing" title="Hashing, hashtables">
            hashing
          </option>
          <option
            value="implementation"
            title="Implementation problems, programming technics, simulation">
            implementation
          </option>
          <option value="interactive" title="Interactive problem">
            interactive
          </option>
          <option
            value="math"
            title="Mathematics including integration, differential equations, etc">
            math
          </option>
          <option
            value="matrices"
            title="Matrix multiplication, determinant, Cramer's rule, systems of linear equations">
            matrices
          </option>
          <option
            value="meet-in-the-middle"
            title="Meet-in-the-middle">
            meet-in-the-middle
          </option>
          <option
            value="number theory"
            title="Number theory: Euler function, GCD, divisibility, etc">
            number theory
          </option>
          <option
            value="probabilities"
            title="Probabilities, expected values, statistics, random variables, etc">
            probabilities
          </option>
          <option value="schedules" title="Scheduling Algorithms">
            schedules
          </option>
          <option
            value="shortest paths"
            title="Shortest paths on weighted and unweighted graphs">
            shortest paths
          </option>
          <option value="sortings" title="Sortings, orderings">
            sortings
          </option>
          <option
            value="string suffix structures"
            title="Suffix arrays, suffix trees, suffix automatas, etc">
            string suffix structures
          </option>
          <option
            value="strings"
            title="Prefix- and Z-functions, suffix structures, Knuth–Morris–Pratt algorithm, etc">
            strings
          </option>
          <option value="ternary search" title="Ternary search">
            ternary search
          </option>
          <option value="trees" title="Trees">
            trees
          </option>
          <option value="two pointers" title="Two pointers">
            two pointers
          </option>
        </select>
        <h2 style={{ marginBottom: 0, fontFamily: 'lato', textTransform: 'uppercase', letterSpacing: '3px', color: '#fff', }}>TAG LIST</h2>
        <ul style={{ fontFamily: 'lato', textTransform: 'uppercase', fontSize: '0.8rem', color: '#fff' }}>
          {taglist.map(e => <li>{e}</li>).length === 0 ? (
            <li>No Tags Selected</li>
          ) : (
            taglist.map(e => <li key={e}>{e}</li>)
          )}
        </ul>
        <button className="gen-btn" onClick={generateProblemList} >
          Generate
        </button>
        <div className='questions'
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '4rem',
            marginBottom: '0.8rem',
          }}>
          <div className='card' style={{
            border: '5px solid #15f4ee',
            transition: '1.5s',
            display: 'none',
            width: '50vh',
            height: '50vh',
            borderRadius: '15px',
            overflow: 'hidden',
          }} >
            {problemList}
          </div>
        </div>
        <div style={{
          width: '70%',
          display: 'none',
          flexDirection: 'row',
          position: 'relative',
          marginBottom: '10rem',
        }} className='but'>
          <button className='pre' onClick={bpre}>PREVIOUS</button>
          <button className='next' onClick={bnxt}>NEXT</button>
        </div>
      </main>
      <footer style={{ color: 'red', }}>
        <p>&copy; Made by <strong>Manu Sisodia</strong></p>
      </footer>
      <style jsx>{`
                #stars {
                  width: 1px;
                  height: 1px;
                  background: transparent;
                  animation: animStar 50s linear infinite;
                  box-shadow: 779px 1331px #fff, 324px 42px #fff, 303px 586px #fff,
                  1312px 276px #fff, 451px 625px #fff, 521px 1931px #fff, 1087px 1871px #fff,
                  36px 1546px #fff, 132px 934px #fff, 1698px 901px #fff, 1418px 664px #fff,
                  1448px 1157px #fff, 1084px 232px #fff, 347px 1776px #fff, 1722px 243px #fff,
                  1629px 835px #fff, 479px 969px #fff, 1231px 960px #fff, 586px 384px #fff,
                  164px 527px #fff, 8px 646px #fff, 1150px 1126px #fff, 665px 1357px #fff,
                  1556px 1982px #fff, 1260px 1961px #fff, 1675px 1741px #fff,
                  1843px 1514px #fff, 718px 1628px #fff, 242px 1343px #fff, 1497px 1880px #fff,
                  1364px 230px #fff, 1739px 1302px #fff, 636px 959px #fff, 304px 686px #fff,
                  614px 751px #fff, 1935px 816px #fff, 1428px 60px #fff, 355px 335px #fff,
                  1594px 158px #fff, 90px 60px #fff, 1553px 162px #fff, 1239px 1825px #fff,
                  1945px 587px #fff, 749px 1785px #fff, 1987px 1172px #fff, 1301px 1237px #fff,
                  1039px 342px #fff, 1585px 1481px #fff, 995px 1048px #fff, 524px 932px #fff,
                  214px 413px #fff, 1701px 1300px #fff, 1037px 1613px #fff, 1871px 996px #fff,
                  1360px 1635px #fff, 1110px 1313px #fff, 412px 1783px #fff, 1949px 177px #fff,
                  903px 1854px #fff, 700px 1936px #fff, 378px 125px #fff, 308px 834px #fff,
                  1118px 962px #fff, 1350px 1929px #fff, 781px 1811px #fff, 561px 137px #fff,
                  757px 1148px #fff, 1670px 1979px #fff, 343px 739px #fff, 945px 795px #fff,
                  576px 1903px #fff, 1078px 1436px #fff, 1583px 450px #fff, 1366px 474px #fff,
                  297px 1873px #fff, 192px 162px #fff, 1624px 1633px #fff, 59px 453px #fff,
                  82px 1872px #fff, 1933px 498px #fff, 1966px 1974px #fff, 1975px 1688px #fff,
                  779px 314px #fff, 1858px 1543px #fff, 73px 1507px #fff, 1693px 975px #fff,
                  1683px 108px #fff, 1768px 1654px #fff, 654px 14px #fff, 494px 171px #fff,
                  1689px 1895px #fff, 1660px 263px #fff, 1031px 903px #fff, 1203px 1393px #fff,
                  1333px 1421px #fff, 1113px 41px #fff, 1206px 1645px #fff, 1325px 1635px #fff,
                  142px 388px #fff, 572px 215px #fff, 1535px 296px #fff, 1419px 407px #fff,
                  1379px 1003px #fff, 329px 469px #fff, 1791px 1652px #fff, 935px 1802px #fff,
                  1330px 1820px #fff, 421px 1933px #fff, 828px 365px #fff, 275px 316px #fff,
                  707px 960px #fff, 1605px 1554px #fff, 625px 58px #fff, 717px 1697px #fff,
                  1669px 246px #fff, 1925px 322px #fff, 1154px 1803px #fff, 1929px 295px #fff,
                  1248px 240px #fff, 1045px 1755px #fff, 166px 942px #fff, 1888px 1773px #fff,
                  678px 1963px #fff, 1370px 569px #fff, 1974px 1400px #fff, 1786px 460px #fff,
                  51px 307px #fff, 784px 1400px #fff, 730px 1258px #fff, 1712px 393px #fff,
                  416px 170px #fff, 1797px 1932px #fff, 572px 219px #fff, 1557px 1856px #fff,
                  218px 8px #fff, 348px 1334px #fff, 469px 413px #fff, 385px 1738px #fff,
                  1357px 1818px #fff, 240px 942px #fff, 248px 1847px #fff, 1535px 806px #fff,
                  236px 1514px #fff, 1429px 1556px #fff, 73px 1633px #fff, 1398px 1121px #fff,
                  671px 1301px #fff, 1404px 1663px #fff, 740px 1018px #fff, 1600px 377px #fff,
                  785px 514px #fff, 112px 1084px #fff, 1915px 1887px #fff, 1463px 1848px #fff,
                  687px 1115px #fff, 1268px 1768px #fff, 1729px 1425px #fff,
                  1284px 1022px #fff, 801px 974px #fff, 1975px 1317px #fff, 1354px 834px #fff,
                  1446px 1484px #fff, 1283px 1786px #fff, 11px 523px #fff, 1842px 236px #fff,
                  1355px 654px #fff, 429px 7px #fff, 1033px 1128px #fff, 157px 297px #fff,
                  545px 635px #fff, 52px 1080px #fff, 827px 1520px #fff, 1121px 490px #fff,
                  9px 309px #fff, 1744px 1586px #fff, 1014px 417px #fff, 1534px 524px #fff,
                  958px 552px #fff, 1403px 1496px #fff, 387px 703px #fff, 1522px 548px #fff,
                  1355px 282px #fff, 1532px 601px #fff, 1838px 790px #fff, 290px 259px #fff,
                  295px 598px #fff, 1601px 539px #fff, 1561px 1272px #fff, 34px 1922px #fff,
                  1024px 543px #fff, 467px 369px #fff, 722px 333px #fff, 1976px 1255px #fff,
                  766px 983px #fff, 1582px 1285px #fff, 12px 512px #fff, 617px 1410px #fff,
                  682px 577px #fff, 1334px 1438px #fff, 439px 327px #fff, 1617px 1661px #fff,
                  673px 129px #fff, 794px 941px #fff, 1386px 1902px #fff, 37px 1353px #fff,
                  1467px 1353px #fff, 416px 18px #fff, 187px 344px #fff, 200px 1898px #fff,
                  1491px 1619px #fff, 811px 347px #fff, 924px 1827px #fff, 945px 217px #fff,
                  1735px 1228px #fff, 379px 1890px #fff, 79px 761px #fff, 825px 1837px #fff,
                  1980px 1558px #fff, 1308px 1573px #fff, 1488px 1726px #fff,
                  382px 1208px #fff, 522px 595px #fff, 1277px 1898px #fff, 354px 552px #fff,
                  161px 1784px #fff, 614px 251px #fff, 526px 1576px #fff, 17px 212px #fff,
                  179px 996px #fff, 467px 1208px #fff, 1944px 1838px #fff, 1140px 1093px #fff,
                  858px 1007px #fff, 200px 1064px #fff, 423px 1964px #fff, 1945px 439px #fff,
                  1377px 689px #fff, 1120px 1437px #fff, 1876px 668px #fff, 907px 1324px #fff,
                  343px 1976px #fff, 1816px 1501px #fff, 1849px 177px #fff, 647px 91px #fff,
                  1984px 1012px #fff, 1336px 1300px #fff, 128px 648px #fff, 305px 1060px #fff,
                  1324px 826px #fff, 1263px 1314px #fff, 1801px 629px #fff, 1614px 1555px #fff,
                  1634px 90px #fff, 1603px 452px #fff, 891px 1984px #fff, 1556px 1906px #fff,
                  121px 68px #fff, 1676px 1714px #fff, 516px 936px #fff, 1947px 1492px #fff,
                  1455px 1519px #fff, 45px 602px #fff, 205px 1039px #fff, 793px 172px #fff,
                  1562px 1739px #fff, 1056px 110px #fff, 1512px 379px #fff, 1795px 1621px #fff,
                  1848px 607px #fff, 262px 1719px #fff, 477px 991px #fff, 483px 883px #fff,
                  1239px 1197px #fff, 1496px 647px #fff, 1649px 25px #fff, 1491px 1946px #fff,
                  119px 996px #fff, 179px 1472px #fff, 1341px 808px #fff, 1565px 1700px #fff,
                  407px 1544px #fff, 1754px 357px #fff, 1288px 981px #fff, 902px 1997px #fff,
                  1755px 1668px #fff, 186px 877px #fff, 1202px 1882px #fff, 461px 1213px #fff,
                  1400px 748px #fff, 1969px 1899px #fff, 809px 522px #fff, 514px 1219px #fff,
                  374px 275px #fff, 938px 1973px #fff, 357px 552px #fff, 144px 1722px #fff,
                  1572px 912px #fff, 402px 1858px #fff, 1544px 1195px #fff, 667px 1257px #fff,
                  727px 1496px #fff, 993px 232px #fff, 1772px 313px #fff, 1040px 1590px #fff,
                  1204px 1973px #fff, 1268px 79px #fff, 1555px 1048px #fff, 986px 1707px #fff,
                  978px 1710px #fff, 713px 360px #fff, 407px 863px #fff, 461px 736px #fff,
                  284px 1608px #fff, 103px 430px #fff, 1283px 1319px #fff, 977px 1186px #fff,
                  1966px 1516px #fff, 1287px 1129px #fff, 70px 1098px #fff, 1189px 889px #fff,
                  1126px 1734px #fff, 309px 1292px #fff, 879px 764px #fff, 65px 473px #fff,
                  1003px 1959px #fff, 658px 791px #fff, 402px 1576px #fff, 35px 622px #fff,
                  529px 1589px #fff, 164px 666px #fff, 1876px 1290px #fff, 1541px 526px #fff,
                  270px 1297px #fff, 440px 865px #fff, 1500px 802px #fff, 182px 1754px #fff,
                  1264px 892px #fff, 272px 1249px #fff, 1289px 1535px #fff, 190px 1646px #fff,
                  955px 242px #fff, 1456px 1597px #fff, 1727px 1983px #fff, 635px 801px #fff,
                  226px 455px #fff, 1396px 1710px #fff, 849px 1863px #fff, 237px 1264px #fff,
                  839px 140px #fff, 1122px 735px #fff, 1280px 15px #fff, 1318px 242px #fff,
                  1819px 1148px #fff, 333px 1392px #fff, 1949px 553px #fff, 1878px 1332px #fff,
                  467px 548px #fff, 1812px 1082px #fff, 1067px 193px #fff, 243px 156px #fff,
                  483px 1616px #fff, 1714px 933px #fff, 759px 1800px #fff, 1822px 995px #fff,
                  1877px 572px #fff, 581px 1084px #fff, 107px 732px #fff, 642px 1837px #fff,
                  166px 1493px #fff, 1555px 198px #fff, 819px 307px #fff, 947px 345px #fff,
                  827px 224px #fff, 927px 1394px #fff, 540px 467px #fff, 1093px 405px #fff,
                  1140px 927px #fff, 130px 529px #fff, 33px 1980px #fff, 1147px 1663px #fff,
                  1616px 1436px #fff, 528px 710px #fff, 798px 1100px #fff, 505px 1480px #fff,
                  899px 641px #fff, 1909px 1949px #fff, 1311px 964px #fff, 979px 1301px #fff,
                  1393px 969px #fff, 1793px 1886px #fff, 292px 357px #fff, 1196px 1718px #fff,
                  1290px 1994px #fff, 537px 1973px #fff, 1181px 1674px #fff,
                  1740px 1566px #fff, 1307px 265px #fff, 922px 522px #fff, 1892px 472px #fff,
                  384px 1746px #fff, 392px 1098px #fff, 647px 548px #fff, 390px 1498px #fff,
                  1246px 138px #fff, 730px 876px #fff, 192px 1472px #fff, 1790px 1789px #fff,
                  928px 311px #fff, 1253px 1647px #fff, 747px 1921px #fff, 1561px 1025px #fff,
                  1533px 1292px #fff, 1985px 195px #fff, 728px 729px #fff, 1712px 1936px #fff,
                  512px 1717px #fff, 1528px 483px #fff, 313px 1642px #fff, 281px 1849px #fff,
                  1212px 799px #fff, 435px 1191px #fff, 1422px 611px #fff, 1718px 1964px #fff,
                  411px 944px #fff, 210px 636px #fff, 1502px 1295px #fff, 1434px 349px #fff,
                  769px 60px #fff, 747px 1053px #fff, 789px 504px #fff, 1436px 1264px #fff,
                  1893px 1225px #fff, 1394px 1788px #fff, 1108px 1317px #fff,
                  1673px 1395px #fff, 854px 1010px #fff, 1705px 80px #fff, 1858px 148px #fff,
                  1729px 344px #fff, 1388px 664px #fff, 895px 406px #fff, 1479px 157px #fff,
                  1441px 1157px #fff, 552px 1900px #fff, 516px 364px #fff, 1647px 189px #fff,
                  1427px 1071px #fff, 785px 729px #fff, 1080px 1710px #fff, 504px 204px #fff,
                  1177px 1622px #fff, 657px 34px #fff, 1296px 1099px #fff, 248px 180px #fff,
                  1212px 1568px #fff, 667px 1562px #fff, 695px 841px #fff, 1608px 1247px #fff,
                  751px 882px #fff, 87px 167px #fff, 607px 1368px #fff, 1363px 1203px #fff,
                  1836px 317px #fff, 1668px 1703px #fff, 830px 1154px #fff, 1721px 1398px #fff,
                  1601px 1280px #fff, 976px 874px #fff, 1743px 254px #fff, 1020px 1815px #fff,
                  1670px 1766px #fff, 1890px 735px #fff, 1379px 136px #fff, 1864px 695px #fff,
                  206px 965px #fff, 1404px 1932px #fff, 1923px 1360px #fff, 247px 682px #fff,
                  519px 1708px #fff, 645px 750px #fff, 1164px 1204px #fff, 834px 323px #fff,
                  172px 1350px #fff, 213px 972px #fff, 1837px 190px #fff, 285px 1806px #fff,
                  1047px 1299px #fff, 1548px 825px #fff, 1730px 324px #fff, 1346px 1909px #fff,
                  772px 270px #fff, 345px 1190px #fff, 478px 1433px #fff, 1479px 25px #fff,
                  1994px 1830px #fff, 1744px 732px #fff, 20px 1635px #fff, 690px 1795px #fff,
                  1594px 569px #fff, 579px 245px #fff, 1398px 733px #fff, 408px 1352px #fff,
                  1774px 120px #fff, 1152px 1370px #fff, 1698px 1810px #fff, 710px 1450px #fff,
                  665px 286px #fff, 493px 1720px #fff, 786px 5px #fff, 637px 1140px #fff,
                  764px 324px #fff, 927px 310px #fff, 938px 1424px #fff, 1884px 744px #fff,
                  913px 462px #fff, 1831px 1936px #fff, 1527px 249px #fff, 36px 1381px #fff,
                  1597px 581px #fff, 1530px 355px #fff, 949px 459px #fff, 799px 828px #fff,
                  242px 1471px #fff, 654px 797px #fff, 796px 594px #fff, 1365px 678px #fff,
                  752px 23px #fff, 1630px 541px #fff, 982px 72px #fff, 1733px 1831px #fff,
                  21px 412px #fff, 775px 998px #fff, 335px 1945px #fff, 264px 583px #fff,
                  158px 1311px #fff, 528px 164px #fff, 1978px 574px #fff, 717px 1203px #fff,
                  734px 1591px #fff, 1555px 820px #fff, 16px 1943px #fff, 1625px 1177px #fff,
                  1236px 690px #fff, 1585px 1590px #fff, 1737px 1728px #fff, 721px 698px #fff,
                  1804px 1186px #fff, 166px 980px #fff, 1850px 230px #fff, 330px 1712px #fff,
                  95px 797px #fff, 1948px 1078px #fff, 469px 939px #fff, 1269px 1899px #fff,
                  955px 1220px #fff, 1137px 1075px #fff, 312px 1293px #fff, 986px 1762px #fff,
                  1103px 1238px #fff, 428px 1993px #fff, 355px 570px #fff, 977px 1836px #fff,
                  1395px 1092px #fff, 276px 913px #fff, 1743px 656px #fff, 773px 502px #fff,
                  1686px 1322px #fff, 1516px 1945px #fff, 1334px 501px #fff, 266px 156px #fff,
                  455px 655px #fff, 798px 72px #fff, 1059px 1259px #fff, 1402px 1687px #fff,
                  236px 1329px #fff, 1455px 786px #fff, 146px 1228px #fff, 1851px 823px #fff,
                  1062px 100px #fff, 1220px 953px #fff, 20px 1826px #fff, 36px 1063px #fff,
                  1525px 338px #fff, 790px 1521px #fff, 741px 1099px #fff, 288px 1489px #fff,
                  700px 1060px #fff, 390px 1071px #fff, 411px 1036px #fff, 1853px 1072px #fff,
                  1446px 1085px #fff, 1164px 874px #fff, 924px 925px #fff, 291px 271px #fff,
                  1257px 1964px #fff, 1580px 1352px #fff, 1507px 1216px #fff, 211px 956px #fff,
                  985px 1195px #fff, 975px 1640px #fff, 518px 101px #fff, 663px 1395px #fff,
                  914px 532px #fff, 145px 1320px #fff, 69px 1397px #fff, 982px 523px #fff,
                  257px 725px #fff, 1599px 831px #fff, 1636px 1513px #fff, 1250px 1158px #fff,
                  1132px 604px #fff, 183px 102px #fff, 1057px 318px #fff, 1247px 1835px #fff,
                  1983px 1110px #fff, 1077px 1455px #fff, 921px 1770px #fff, 806px 1350px #fff,
                  1938px 1992px #fff, 855px 1260px #fff, 902px 1345px #fff, 658px 1908px #fff,
                  1845px 679px #fff, 712px 1482px #fff, 595px 950px #fff, 1784px 1992px #fff,
                  1847px 1785px #fff, 691px 1004px #fff, 175px 1179px #fff, 1666px 1911px #fff,
                  41px 61px #fff, 971px 1080px #fff, 1830px 1450px #fff, 1351px 1518px #fff,
                  1257px 99px #fff, 1395px 1498px #fff, 1117px 252px #fff, 1779px 597px #fff,
                  1346px 729px #fff, 1108px 1144px #fff, 402px 691px #fff, 72px 496px #fff,
                  1673px 1604px #fff, 1497px 974px #fff, 1865px 1664px #fff, 88px 806px #fff,
                  918px 77px #fff, 244px 1118px #fff, 256px 1820px #fff, 1851px 1840px #fff,
                  605px 1851px #fff, 634px 383px #fff, 865px 37px #fff, 943px 1024px #fff,
                  1951px 177px #fff, 1097px 523px #fff, 985px 1700px #fff, 1243px 122px #fff,
                  768px 1070px #fff, 468px 194px #fff, 320px 1867px #fff, 1850px 185px #fff,
                  380px 1616px #fff, 468px 1294px #fff, 1122px 1743px #fff, 884px 299px #fff,
                  1300px 1917px #fff, 1860px 396px #fff, 1270px 990px #fff, 529px 733px #fff,
                  1975px 1347px #fff, 1885px 685px #fff, 226px 506px #fff, 651px 878px #fff,
                  1323px 680px #fff, 1284px 680px #fff, 238px 1967px #fff, 911px 174px #fff,
                  1111px 521px #fff, 1150px 85px #fff, 794px 502px #fff, 484px 1856px #fff,
                  1809px 368px #fff, 112px 953px #fff, 590px 1009px #fff, 1655px 311px #fff,
                  100px 1026px #fff, 1803px 352px #fff, 865px 306px #fff, 1077px 1019px #fff,
                  1335px 872px #fff, 1647px 1298px #fff, 1233px 1387px #fff, 698px 1036px #fff,
                  659px 1860px #fff, 388px 1412px #fff, 1212px 458px #fff, 755px 1468px #fff,
                  696px 1654px #fff, 1144px 60px #fff;
              }
              
              #stars:after {
                  content: '';
                  position: absolute;
                  
                  width: 1px;
                  height: 1px;
                  background: transparent;
                  box-shadow: 779px 1331px #fff, 324px 42px #fff, 303px 586px #fff,
                  1312px 276px #fff, 451px 625px #fff, 521px 1931px #fff, 1087px 1871px #fff,
                  36px 1546px #fff, 132px 934px #fff, 1698px 901px #fff, 1418px 664px #fff,
                  1448px 1157px #fff, 1084px 232px #fff, 347px 1776px #fff, 1722px 243px #fff,
                  1629px 835px #fff, 479px 969px #fff, 1231px 960px #fff, 586px 384px #fff,
                  164px 527px #fff, 8px 646px #fff, 1150px 1126px #fff, 665px 1357px #fff,
                  1556px 1982px #fff, 1260px 1961px #fff, 1675px 1741px #fff,
                  1843px 1514px #fff, 718px 1628px #fff, 242px 1343px #fff, 1497px 1880px #fff,
                  1364px 230px #fff, 1739px 1302px #fff, 636px 959px #fff, 304px 686px #fff,
                  614px 751px #fff, 1935px 816px #fff, 1428px 60px #fff, 355px 335px #fff,
                  1594px 158px #fff, 90px 60px #fff, 1553px 162px #fff, 1239px 1825px #fff,
                  1945px 587px #fff, 749px 1785px #fff, 1987px 1172px #fff, 1301px 1237px #fff,
                  1039px 342px #fff, 1585px 1481px #fff, 995px 1048px #fff, 524px 932px #fff,
                  214px 413px #fff, 1701px 1300px #fff, 1037px 1613px #fff, 1871px 996px #fff,
                  1360px 1635px #fff, 1110px 1313px #fff, 412px 1783px #fff, 1949px 177px #fff,
                  903px 1854px #fff, 700px 1936px #fff, 378px 125px #fff, 308px 834px #fff,
                  1118px 962px #fff, 1350px 1929px #fff, 781px 1811px #fff, 561px 137px #fff,
                  757px 1148px #fff, 1670px 1979px #fff, 343px 739px #fff, 945px 795px #fff,
                  576px 1903px #fff, 1078px 1436px #fff, 1583px 450px #fff, 1366px 474px #fff,
                  297px 1873px #fff, 192px 162px #fff, 1624px 1633px #fff, 59px 453px #fff,
                  82px 1872px #fff, 1933px 498px #fff, 1966px 1974px #fff, 1975px 1688px #fff,
                  779px 314px #fff, 1858px 1543px #fff, 73px 1507px #fff, 1693px 975px #fff,
                  1683px 108px #fff, 1768px 1654px #fff, 654px 14px #fff, 494px 171px #fff,
                  1689px 1895px #fff, 1660px 263px #fff, 1031px 903px #fff, 1203px 1393px #fff,
                  1333px 1421px #fff, 1113px 41px #fff, 1206px 1645px #fff, 1325px 1635px #fff,
                  142px 388px #fff, 572px 215px #fff, 1535px 296px #fff, 1419px 407px #fff,
                  1379px 1003px #fff, 329px 469px #fff, 1791px 1652px #fff, 935px 1802px #fff,
                  1330px 1820px #fff, 421px 1933px #fff, 828px 365px #fff, 275px 316px #fff,
                  707px 960px #fff, 1605px 1554px #fff, 625px 58px #fff, 717px 1697px #fff,
                  1669px 246px #fff, 1925px 322px #fff, 1154px 1803px #fff, 1929px 295px #fff,
                  1248px 240px #fff, 1045px 1755px #fff, 166px 942px #fff, 1888px 1773px #fff,
                  678px 1963px #fff, 1370px 569px #fff, 1974px 1400px #fff, 1786px 460px #fff,
                  51px 307px #fff, 784px 1400px #fff, 730px 1258px #fff, 1712px 393px #fff,
                  416px 170px #fff, 1797px 1932px #fff, 572px 219px #fff, 1557px 1856px #fff,
                  218px 8px #fff, 348px 1334px #fff, 469px 413px #fff, 385px 1738px #fff,
                  1357px 1818px #fff, 240px 942px #fff, 248px 1847px #fff, 1535px 806px #fff,
                  236px 1514px #fff, 1429px 1556px #fff, 73px 1633px #fff, 1398px 1121px #fff,
                  671px 1301px #fff, 1404px 1663px #fff, 740px 1018px #fff, 1600px 377px #fff,
                  785px 514px #fff, 112px 1084px #fff, 1915px 1887px #fff, 1463px 1848px #fff,
                  687px 1115px #fff, 1268px 1768px #fff, 1729px 1425px #fff,
                  1284px 1022px #fff, 801px 974px #fff, 1975px 1317px #fff, 1354px 834px #fff,
                  1446px 1484px #fff, 1283px 1786px #fff, 11px 523px #fff, 1842px 236px #fff,
                  1355px 654px #fff, 429px 7px #fff, 1033px 1128px #fff, 157px 297px #fff,
                  545px 635px #fff, 52px 1080px #fff, 827px 1520px #fff, 1121px 490px #fff,
                  9px 309px #fff, 1744px 1586px #fff, 1014px 417px #fff, 1534px 524px #fff,
                  958px 552px #fff, 1403px 1496px #fff, 387px 703px #fff, 1522px 548px #fff,
                  1355px 282px #fff, 1532px 601px #fff, 1838px 790px #fff, 290px 259px #fff,
                  295px 598px #fff, 1601px 539px #fff, 1561px 1272px #fff, 34px 1922px #fff,
                  1024px 543px #fff, 467px 369px #fff, 722px 333px #fff, 1976px 1255px #fff,
                  766px 983px #fff, 1582px 1285px #fff, 12px 512px #fff, 617px 1410px #fff,
                  682px 577px #fff, 1334px 1438px #fff, 439px 327px #fff, 1617px 1661px #fff,
                  673px 129px #fff, 794px 941px #fff, 1386px 1902px #fff, 37px 1353px #fff,
                  1467px 1353px #fff, 416px 18px #fff, 187px 344px #fff, 200px 1898px #fff,
                  1491px 1619px #fff, 811px 347px #fff, 924px 1827px #fff, 945px 217px #fff,
                  1735px 1228px #fff, 379px 1890px #fff, 79px 761px #fff, 825px 1837px #fff,
                  1980px 1558px #fff, 1308px 1573px #fff, 1488px 1726px #fff,
                  382px 1208px #fff, 522px 595px #fff, 1277px 1898px #fff, 354px 552px #fff,
                  161px 1784px #fff, 614px 251px #fff, 526px 1576px #fff, 17px 212px #fff,
                  179px 996px #fff, 467px 1208px #fff, 1944px 1838px #fff, 1140px 1093px #fff,
                  858px 1007px #fff, 200px 1064px #fff, 423px 1964px #fff, 1945px 439px #fff,
                  1377px 689px #fff, 1120px 1437px #fff, 1876px 668px #fff, 907px 1324px #fff,
                  343px 1976px #fff, 1816px 1501px #fff, 1849px 177px #fff, 647px 91px #fff,
                  1984px 1012px #fff, 1336px 1300px #fff, 128px 648px #fff, 305px 1060px #fff,
                  1324px 826px #fff, 1263px 1314px #fff, 1801px 629px #fff, 1614px 1555px #fff,
                  1634px 90px #fff, 1603px 452px #fff, 891px 1984px #fff, 1556px 1906px #fff,
                  121px 68px #fff, 1676px 1714px #fff, 516px 936px #fff, 1947px 1492px #fff,
                  1455px 1519px #fff, 45px 602px #fff, 205px 1039px #fff, 793px 172px #fff,
                  1562px 1739px #fff, 1056px 110px #fff, 1512px 379px #fff, 1795px 1621px #fff,
                  1848px 607px #fff, 262px 1719px #fff, 477px 991px #fff, 483px 883px #fff,
                  1239px 1197px #fff, 1496px 647px #fff, 1649px 25px #fff, 1491px 1946px #fff,
                  119px 996px #fff, 179px 1472px #fff, 1341px 808px #fff, 1565px 1700px #fff,
                  407px 1544px #fff, 1754px 357px #fff, 1288px 981px #fff, 902px 1997px #fff,
                  1755px 1668px #fff, 186px 877px #fff, 1202px 1882px #fff, 461px 1213px #fff,
                  1400px 748px #fff, 1969px 1899px #fff, 809px 522px #fff, 514px 1219px #fff,
                  374px 275px #fff, 938px 1973px #fff, 357px 552px #fff, 144px 1722px #fff,
                  1572px 912px #fff, 402px 1858px #fff, 1544px 1195px #fff, 667px 1257px #fff,
                  727px 1496px #fff, 993px 232px #fff, 1772px 313px #fff, 1040px 1590px #fff,
                  1204px 1973px #fff, 1268px 79px #fff, 1555px 1048px #fff, 986px 1707px #fff,
                  978px 1710px #fff, 713px 360px #fff, 407px 863px #fff, 461px 736px #fff,
                  284px 1608px #fff, 103px 430px #fff, 1283px 1319px #fff, 977px 1186px #fff,
                  1966px 1516px #fff, 1287px 1129px #fff, 70px 1098px #fff, 1189px 889px #fff,
                  1126px 1734px #fff, 309px 1292px #fff, 879px 764px #fff, 65px 473px #fff,
                  1003px 1959px #fff, 658px 791px #fff, 402px 1576px #fff, 35px 622px #fff,
                  529px 1589px #fff, 164px 666px #fff, 1876px 1290px #fff, 1541px 526px #fff,
                  270px 1297px #fff, 440px 865px #fff, 1500px 802px #fff, 182px 1754px #fff,
                  1264px 892px #fff, 272px 1249px #fff, 1289px 1535px #fff, 190px 1646px #fff,
                  955px 242px #fff, 1456px 1597px #fff, 1727px 1983px #fff, 635px 801px #fff,
                  226px 455px #fff, 1396px 1710px #fff, 849px 1863px #fff, 237px 1264px #fff,
                  839px 140px #fff, 1122px 735px #fff, 1280px 15px #fff, 1318px 242px #fff,
                  1819px 1148px #fff, 333px 1392px #fff, 1949px 553px #fff, 1878px 1332px #fff,
                  467px 548px #fff, 1812px 1082px #fff, 1067px 193px #fff, 243px 156px #fff,
                  483px 1616px #fff, 1714px 933px #fff, 759px 1800px #fff, 1822px 995px #fff,
                  1877px 572px #fff, 581px 1084px #fff, 107px 732px #fff, 642px 1837px #fff,
                  166px 1493px #fff, 1555px 198px #fff, 819px 307px #fff, 947px 345px #fff,
                  827px 224px #fff, 927px 1394px #fff, 540px 467px #fff, 1093px 405px #fff,
                  1140px 927px #fff, 130px 529px #fff, 33px 1980px #fff, 1147px 1663px #fff,
                  1616px 1436px #fff, 528px 710px #fff, 798px 1100px #fff, 505px 1480px #fff,
                  899px 641px #fff, 1909px 1949px #fff, 1311px 964px #fff, 979px 1301px #fff,
                  1393px 969px #fff, 1793px 1886px #fff, 292px 357px #fff, 1196px 1718px #fff,
                  1290px 1994px #fff, 537px 1973px #fff, 1181px 1674px #fff,
                  1740px 1566px #fff, 1307px 265px #fff, 922px 522px #fff, 1892px 472px #fff,
                  384px 1746px #fff, 392px 1098px #fff, 647px 548px #fff, 390px 1498px #fff,
                  1246px 138px #fff, 730px 876px #fff, 192px 1472px #fff, 1790px 1789px #fff,
                  928px 311px #fff, 1253px 1647px #fff, 747px 1921px #fff, 1561px 1025px #fff,
                  1533px 1292px #fff, 1985px 195px #fff, 728px 729px #fff, 1712px 1936px #fff,
                  512px 1717px #fff, 1528px 483px #fff, 313px 1642px #fff, 281px 1849px #fff,
                  1212px 799px #fff, 435px 1191px #fff, 1422px 611px #fff, 1718px 1964px #fff,
                  411px 944px #fff, 210px 636px #fff, 1502px 1295px #fff, 1434px 349px #fff,
                  769px 60px #fff, 747px 1053px #fff, 789px 504px #fff, 1436px 1264px #fff,
                  1893px 1225px #fff, 1394px 1788px #fff, 1108px 1317px #fff,
                  1673px 1395px #fff, 854px 1010px #fff, 1705px 80px #fff, 1858px 148px #fff,
                  1729px 344px #fff, 1388px 664px #fff, 895px 406px #fff, 1479px 157px #fff,
                  1441px 1157px #fff, 552px 1900px #fff, 516px 364px #fff, 1647px 189px #fff,
                  1427px 1071px #fff, 785px 729px #fff, 1080px 1710px #fff, 504px 204px #fff,
                  1177px 1622px #fff, 657px 34px #fff, 1296px 1099px #fff, 248px 180px #fff,
                  1212px 1568px #fff, 667px 1562px #fff, 695px 841px #fff, 1608px 1247px #fff,
                  751px 882px #fff, 87px 167px #fff, 607px 1368px #fff, 1363px 1203px #fff,
                  1836px 317px #fff, 1668px 1703px #fff, 830px 1154px #fff, 1721px 1398px #fff,
                  1601px 1280px #fff, 976px 874px #fff, 1743px 254px #fff, 1020px 1815px #fff,
                  1670px 1766px #fff, 1890px 735px #fff, 1379px 136px #fff, 1864px 695px #fff,
                  206px 965px #fff, 1404px 1932px #fff, 1923px 1360px #fff, 247px 682px #fff,
                  519px 1708px #fff, 645px 750px #fff, 1164px 1204px #fff, 834px 323px #fff,
                  172px 1350px #fff, 213px 972px #fff, 1837px 190px #fff, 285px 1806px #fff,
                  1047px 1299px #fff, 1548px 825px #fff, 1730px 324px #fff, 1346px 1909px #fff,
                  772px 270px #fff, 345px 1190px #fff, 478px 1433px #fff, 1479px 25px #fff,
                  1994px 1830px #fff, 1744px 732px #fff, 20px 1635px #fff, 690px 1795px #fff,
                  1594px 569px #fff, 579px 245px #fff, 1398px 733px #fff, 408px 1352px #fff,
                  1774px 120px #fff, 1152px 1370px #fff, 1698px 1810px #fff, 710px 1450px #fff,
                  665px 286px #fff, 493px 1720px #fff, 786px 5px #fff, 637px 1140px #fff,
                  764px 324px #fff, 927px 310px #fff, 938px 1424px #fff, 1884px 744px #fff,
                  913px 462px #fff, 1831px 1936px #fff, 1527px 249px #fff, 36px 1381px #fff,
                  1597px 581px #fff, 1530px 355px #fff, 949px 459px #fff, 799px 828px #fff,
                  242px 1471px #fff, 654px 797px #fff, 796px 594px #fff, 1365px 678px #fff,
                  752px 23px #fff, 1630px 541px #fff, 982px 72px #fff, 1733px 1831px #fff,
                  21px 412px #fff, 775px 998px #fff, 335px 1945px #fff, 264px 583px #fff,
                  158px 1311px #fff, 528px 164px #fff, 1978px 574px #fff, 717px 1203px #fff,
                  734px 1591px #fff, 1555px 820px #fff, 16px 1943px #fff, 1625px 1177px #fff,
                  1236px 690px #fff, 1585px 1590px #fff, 1737px 1728px #fff, 721px 698px #fff,
                  1804px 1186px #fff, 166px 980px #fff, 1850px 230px #fff, 330px 1712px #fff,
                  95px 797px #fff, 1948px 1078px #fff, 469px 939px #fff, 1269px 1899px #fff,
                  955px 1220px #fff, 1137px 1075px #fff, 312px 1293px #fff, 986px 1762px #fff,
                  1103px 1238px #fff, 428px 1993px #fff, 355px 570px #fff, 977px 1836px #fff,
                  1395px 1092px #fff, 276px 913px #fff, 1743px 656px #fff, 773px 502px #fff,
                  1686px 1322px #fff, 1516px 1945px #fff, 1334px 501px #fff, 266px 156px #fff,
                  455px 655px #fff, 798px 72px #fff, 1059px 1259px #fff, 1402px 1687px #fff,
                  236px 1329px #fff, 1455px 786px #fff, 146px 1228px #fff, 1851px 823px #fff,
                  1062px 100px #fff, 1220px 953px #fff, 20px 1826px #fff, 36px 1063px #fff,
                  1525px 338px #fff, 790px 1521px #fff, 741px 1099px #fff, 288px 1489px #fff,
                  700px 1060px #fff, 390px 1071px #fff, 411px 1036px #fff, 1853px 1072px #fff,
                  1446px 1085px #fff, 1164px 874px #fff, 924px 925px #fff, 291px 271px #fff,
                  1257px 1964px #fff, 1580px 1352px #fff, 1507px 1216px #fff, 211px 956px #fff,
                  985px 1195px #fff, 975px 1640px #fff, 518px 101px #fff, 663px 1395px #fff,
                  914px 532px #fff, 145px 1320px #fff, 69px 1397px #fff, 982px 523px #fff,
                  257px 725px #fff, 1599px 831px #fff, 1636px 1513px #fff, 1250px 1158px #fff,
                  1132px 604px #fff, 183px 102px #fff, 1057px 318px #fff, 1247px 1835px #fff,
                  1983px 1110px #fff, 1077px 1455px #fff, 921px 1770px #fff, 806px 1350px #fff,
                  1938px 1992px #fff, 855px 1260px #fff, 902px 1345px #fff, 658px 1908px #fff,
                  1845px 679px #fff, 712px 1482px #fff, 595px 950px #fff, 1784px 1992px #fff,
                  1847px 1785px #fff, 691px 1004px #fff, 175px 1179px #fff, 1666px 1911px #fff,
                  41px 61px #fff, 971px 1080px #fff, 1830px 1450px #fff, 1351px 1518px #fff,
                  1257px 99px #fff, 1395px 1498px #fff, 1117px 252px #fff, 1779px 597px #fff,
                  1346px 729px #fff, 1108px 1144px #fff, 402px 691px #fff, 72px 496px #fff,
                  1673px 1604px #fff, 1497px 974px #fff, 1865px 1664px #fff, 88px 806px #fff,
                  918px 77px #fff, 244px 1118px #fff, 256px 1820px #fff, 1851px 1840px #fff,
                  605px 1851px #fff, 634px 383px #fff, 865px 37px #fff, 943px 1024px #fff,
                  1951px 177px #fff, 1097px 523px #fff, 985px 1700px #fff, 1243px 122px #fff,
                  768px 1070px #fff, 468px 194px #fff, 320px 1867px #fff, 1850px 185px #fff,
                  380px 1616px #fff, 468px 1294px #fff, 1122px 1743px #fff, 884px 299px #fff,
                  1300px 1917px #fff, 1860px 396px #fff, 1270px 990px #fff, 529px 733px #fff,
                  1975px 1347px #fff, 1885px 685px #fff, 226px 506px #fff, 651px 878px #fff,
                  1323px 680px #fff, 1284px 680px #fff, 238px 1967px #fff, 911px 174px #fff,
                  1111px 521px #fff, 1150px 85px #fff, 794px 502px #fff, 484px 1856px #fff,
                  1809px 368px #fff, 112px 953px #fff, 590px 1009px #fff, 1655px 311px #fff,
                  100px 1026px #fff, 1803px 352px #fff, 865px 306px #fff, 1077px 1019px #fff,
                  1335px 872px #fff, 1647px 1298px #fff, 1233px 1387px #fff, 698px 1036px #fff,
                  659px 1860px #fff, 388px 1412px #fff, 1212px 458px #fff, 755px 1468px #fff,
                  696px 1654px #fff, 1144px 60px #fff;
              }
              
              #stars2 {
                  width: 2px;
                  height: 2px;
                  background: transparent;
                  animation: animStar 100s linear infinite;
                  box-shadow: 1448px 320px #fff, 1775px 1663px #fff, 332px 1364px #fff,
                  878px 340px #fff, 569px 1832px #fff, 1422px 1684px #fff, 1946px 1907px #fff,
                  121px 979px #fff, 1044px 1069px #fff, 463px 381px #fff, 423px 112px #fff,
                  523px 1179px #fff, 779px 654px #fff, 1398px 694px #fff, 1085px 1464px #fff,
                  1599px 1869px #fff, 801px 1882px #fff, 779px 1231px #fff, 552px 932px #fff,
                  1057px 1196px #fff, 282px 1280px #fff, 496px 1986px #fff, 1833px 1120px #fff,
                  1802px 1293px #fff, 6px 1696px #fff, 412px 1902px #fff, 605px 438px #fff,
                  24px 1212px #fff, 234px 1320px #fff, 544px 344px #fff, 1107px 170px #fff,
                  1603px 196px #fff, 905px 648px #fff, 68px 1458px #fff, 649px 1969px #fff,
                  744px 675px #fff, 1127px 478px #fff, 714px 1814px #fff, 1486px 526px #fff,
                  270px 1636px #fff, 1931px 149px #fff, 1807px 378px #fff, 8px 390px #fff,
                  1415px 699px #fff, 1473px 1211px #fff, 1590px 141px #fff, 270px 1705px #fff,
                  69px 1423px #fff, 1108px 1053px #fff, 1946px 128px #fff, 371px 371px #fff,
                  1490px 220px #fff, 357px 1885px #fff, 363px 363px #fff, 1896px 1256px #fff,
                  1979px 1050px #fff, 947px 1342px #fff, 1754px 242px #fff, 514px 974px #fff,
                  65px 1477px #fff, 1840px 547px #fff, 950px 695px #fff, 459px 1150px #fff,
                  1124px 1502px #fff, 481px 940px #fff, 680px 839px #fff, 797px 1169px #fff,
                  1977px 1491px #fff, 734px 1724px #fff, 210px 298px #fff, 816px 628px #fff,
                  686px 770px #fff, 1721px 267px #fff, 1663px 511px #fff, 1481px 1141px #fff,
                  582px 248px #fff, 1308px 953px #fff, 628px 657px #fff, 897px 1535px #fff,
                  270px 931px #fff, 791px 467px #fff, 1336px 1732px #fff, 1013px 1653px #fff,
                  1911px 956px #fff, 587px 816px #fff, 83px 456px #fff, 930px 1478px #fff,
                  1587px 1694px #fff, 614px 1200px #fff, 302px 1782px #fff, 1711px 1432px #fff,
                  443px 904px #fff, 1666px 714px #fff, 1588px 1167px #fff, 273px 1075px #fff,
                  1679px 461px #fff, 721px 664px #fff, 1202px 10px #fff, 166px 1126px #fff,
                  331px 1628px #fff, 430px 1565px #fff, 1585px 509px #fff, 640px 38px #fff,
                  822px 837px #fff, 1760px 1664px #fff, 1122px 1458px #fff, 398px 131px #fff,
                  689px 285px #fff, 460px 652px #fff, 1627px 365px #fff, 348px 1648px #fff,
                  819px 1946px #fff, 981px 1917px #fff, 323px 76px #fff, 979px 684px #fff,
                  887px 536px #fff, 1348px 1596px #fff, 1055px 666px #fff, 1402px 1797px #fff,
                  1300px 1055px #fff, 937px 238px #fff, 1474px 1815px #fff, 1144px 1710px #fff,
                  1629px 1087px #fff, 911px 919px #fff, 771px 819px #fff, 403px 720px #fff,
                  163px 736px #fff, 1062px 238px #fff, 1774px 818px #fff, 1874px 1178px #fff,
                  1177px 699px #fff, 1244px 1244px #fff, 1371px 58px #fff, 564px 1515px #fff,
                  1824px 487px #fff, 929px 702px #fff, 394px 1348px #fff, 1161px 641px #fff,
                  219px 1841px #fff, 358px 941px #fff, 140px 1759px #fff, 1019px 1345px #fff,
                  274px 436px #fff, 1433px 1605px #fff, 1798px 1426px #fff, 294px 1848px #fff,
                  1681px 1877px #fff, 1344px 1824px #fff, 1439px 1632px #fff,
                  161px 1012px #fff, 1308px 588px #fff, 1789px 582px #fff, 721px 1910px #fff,
                  318px 218px #fff, 607px 319px #fff, 495px 535px #fff, 1552px 1575px #fff,
                  1562px 67px #fff, 403px 926px #fff, 1096px 1800px #fff, 1814px 1709px #fff,
                  1882px 1831px #fff, 533px 46px #fff, 823px 969px #fff, 530px 165px #fff,
                  1030px 352px #fff, 1681px 313px #fff, 338px 115px #fff, 1607px 211px #fff,
                  1718px 1184px #fff, 1589px 659px #fff, 278px 355px #fff, 464px 1464px #fff,
                  1165px 277px #fff, 950px 694px #fff, 1746px 293px #fff, 793px 911px #fff,
                  528px 773px #fff, 1883px 1694px #fff, 748px 182px #fff, 1924px 1531px #fff,
                  100px 636px #fff, 1473px 1445px #fff, 1264px 1244px #fff, 850px 1377px #fff,
                  987px 1976px #fff, 933px 1761px #fff, 922px 1270px #fff, 500px 396px #fff,
                  1324px 8px #fff, 1967px 1814px #fff, 1072px 1401px #fff, 961px 37px #fff,
                  156px 81px #fff, 1915px 502px #fff, 1076px 1846px #fff, 152px 1669px #fff,
                  986px 1529px #fff, 1667px 1137px #fff;
              }
              
              #stars2:after {
                  content: '';
                  position: absolute;
                  width: 2px;
                  height: 2px;
                  background: transparent;
                  box-shadow: 1448px 320px #fff, 1775px 1663px #fff, 332px 1364px #fff,
                  878px 340px #fff, 569px 1832px #fff, 1422px 1684px #fff, 1946px 1907px #fff,
                  121px 979px #fff, 1044px 1069px #fff, 463px 381px #fff, 423px 112px #fff,
                  523px 1179px #fff, 779px 654px #fff, 1398px 694px #fff, 1085px 1464px #fff,
                  1599px 1869px #fff, 801px 1882px #fff, 779px 1231px #fff, 552px 932px #fff,
                  1057px 1196px #fff, 282px 1280px #fff, 496px 1986px #fff, 1833px 1120px #fff,
                  1802px 1293px #fff, 6px 1696px #fff, 412px 1902px #fff, 605px 438px #fff,
                  24px 1212px #fff, 234px 1320px #fff, 544px 344px #fff, 1107px 170px #fff,
                  1603px 196px #fff, 905px 648px #fff, 68px 1458px #fff, 649px 1969px #fff,
                  744px 675px #fff, 1127px 478px #fff, 714px 1814px #fff, 1486px 526px #fff,
                  270px 1636px #fff, 1931px 149px #fff, 1807px 378px #fff, 8px 390px #fff,
                  1415px 699px #fff, 1473px 1211px #fff, 1590px 141px #fff, 270px 1705px #fff,
                  69px 1423px #fff, 1108px 1053px #fff, 1946px 128px #fff, 371px 371px #fff,
                  1490px 220px #fff, 357px 1885px #fff, 363px 363px #fff, 1896px 1256px #fff,
                  1979px 1050px #fff, 947px 1342px #fff, 1754px 242px #fff, 514px 974px #fff,
                  65px 1477px #fff, 1840px 547px #fff, 950px 695px #fff, 459px 1150px #fff,
                  1124px 1502px #fff, 481px 940px #fff, 680px 839px #fff, 797px 1169px #fff,
                  1977px 1491px #fff, 734px 1724px #fff, 210px 298px #fff, 816px 628px #fff,
                  686px 770px #fff, 1721px 267px #fff, 1663px 511px #fff, 1481px 1141px #fff,
                  582px 248px #fff, 1308px 953px #fff, 628px 657px #fff, 897px 1535px #fff,
                  270px 931px #fff, 791px 467px #fff, 1336px 1732px #fff, 1013px 1653px #fff,
                  1911px 956px #fff, 587px 816px #fff, 83px 456px #fff, 930px 1478px #fff,
                  1587px 1694px #fff, 614px 1200px #fff, 302px 1782px #fff, 1711px 1432px #fff,
                  443px 904px #fff, 1666px 714px #fff, 1588px 1167px #fff, 273px 1075px #fff,
                  1679px 461px #fff, 721px 664px #fff, 1202px 10px #fff, 166px 1126px #fff,
                  331px 1628px #fff, 430px 1565px #fff, 1585px 509px #fff, 640px 38px #fff,
                  822px 837px #fff, 1760px 1664px #fff, 1122px 1458px #fff, 398px 131px #fff,
                  689px 285px #fff, 460px 652px #fff, 1627px 365px #fff, 348px 1648px #fff,
                  819px 1946px #fff, 981px 1917px #fff, 323px 76px #fff, 979px 684px #fff,
                  887px 536px #fff, 1348px 1596px #fff, 1055px 666px #fff, 1402px 1797px #fff,
                  1300px 1055px #fff, 937px 238px #fff, 1474px 1815px #fff, 1144px 1710px #fff,
                  1629px 1087px #fff, 911px 919px #fff, 771px 819px #fff, 403px 720px #fff,
                  163px 736px #fff, 1062px 238px #fff, 1774px 818px #fff, 1874px 1178px #fff,
                  1177px 699px #fff, 1244px 1244px #fff, 1371px 58px #fff, 564px 1515px #fff,
                  1824px 487px #fff, 929px 702px #fff, 394px 1348px #fff, 1161px 641px #fff,
                  219px 1841px #fff, 358px 941px #fff, 140px 1759px #fff, 1019px 1345px #fff,
                  274px 436px #fff, 1433px 1605px #fff, 1798px 1426px #fff, 294px 1848px #fff,
                  1681px 1877px #fff, 1344px 1824px #fff, 1439px 1632px #fff,
                  161px 1012px #fff, 1308px 588px #fff, 1789px 582px #fff, 721px 1910px #fff,
                  318px 218px #fff, 607px 319px #fff, 495px 535px #fff, 1552px 1575px #fff,
                  1562px 67px #fff, 403px 926px #fff, 1096px 1800px #fff, 1814px 1709px #fff,
                  1882px 1831px #fff, 533px 46px #fff, 823px 969px #fff, 530px 165px #fff,
                  1030px 352px #fff, 1681px 313px #fff, 338px 115px #fff, 1607px 211px #fff,
                  1718px 1184px #fff, 1589px 659px #fff, 278px 355px #fff, 464px 1464px #fff,
                  1165px 277px #fff, 950px 694px #fff, 1746px 293px #fff, 793px 911px #fff,
                  528px 773px #fff, 1883px 1694px #fff, 748px 182px #fff, 1924px 1531px #fff,
                  100px 636px #fff, 1473px 1445px #fff, 1264px 1244px #fff, 850px 1377px #fff,
                  987px 1976px #fff, 933px 1761px #fff, 922px 1270px #fff, 500px 396px #fff,
                  1324px 8px #fff, 1967px 1814px #fff, 1072px 1401px #fff, 961px 37px #fff,
                  156px 81px #fff, 1915px 502px #fff, 1076px 1846px #fff, 152px 1669px #fff,
                  986px 1529px #fff, 1667px 1137px #fff;
              }
              
              #stars3 {
                  width: 3px;
                  height: 3px;
                  background: transparent;
                  animation: animStar 150s linear infinte;
                  box-shadow: 387px 1878px #fff, 760px 1564px #fff, 1487px 999px #fff,
                  948px 1828px #fff, 1977px 1001px #fff, 1284px 1963px #fff, 656px 284px #fff,
                  1268px 1635px #fff, 1820px 598px #fff, 642px 1900px #fff, 296px 57px #fff,
                  921px 1620px #fff, 476px 1858px #fff, 658px 613px #fff, 1171px 1363px #fff,
                  1419px 283px #fff, 1037px 731px #fff, 503px 663px #fff, 1562px 463px #fff,
                  383px 1197px #fff, 1171px 1233px #fff, 876px 1768px #fff, 856px 1615px #fff,
                  1375px 1924px #fff, 1725px 918px #fff, 952px 119px #fff, 768px 1212px #fff,
                  992px 1462px #fff, 1929px 717px #fff, 1947px 755px #fff, 1818px 1123px #fff,
                  1896px 1672px #fff, 460px 198px #fff, 256px 271px #fff, 752px 544px #fff,
                  1222px 1859px #fff, 1851px 443px #fff, 313px 1858px #fff, 709px 446px #fff,
                  1546px 697px #fff, 674px 1155px #fff, 1112px 130px #fff, 355px 1790px #fff,
                  1496px 974px #fff, 1696px 480px #fff, 1316px 1265px #fff, 1645px 1063px #fff,
                  1182px 237px #fff, 427px 1582px #fff, 859px 253px #fff, 458px 939px #fff,
                  1517px 1644px #fff, 1943px 60px #fff, 212px 1650px #fff, 966px 1786px #fff,
                  473px 712px #fff, 130px 76px #fff, 1417px 1186px #fff, 909px 1580px #fff,
                  1913px 762px #fff, 204px 1143px #fff, 1998px 1057px #fff, 1468px 1301px #fff,
                  144px 1676px #fff, 21px 1601px #fff, 382px 1362px #fff, 912px 753px #fff,
                  1488px 1405px #fff, 802px 156px #fff, 174px 550px #fff, 338px 1366px #fff,
                  1197px 774px #fff, 602px 486px #fff, 682px 1877px #fff, 348px 1503px #fff,
                  407px 1139px #fff, 950px 1400px #fff, 922px 1139px #fff, 1697px 293px #fff,
                  1238px 1281px #fff, 1038px 1197px #fff, 376px 1889px #fff,
                  1255px 1680px #fff, 1008px 1316px #fff, 1538px 1447px #fff,
                  1186px 874px #fff, 1967px 640px #fff, 1341px 19px #fff, 29px 1732px #fff,
                  16px 1650px #fff, 1021px 1075px #fff, 723px 424px #fff, 1175px 41px #fff,
                  494px 1957px #fff, 1296px 431px #fff, 175px 1507px #fff, 831px 121px #fff,
                  498px 1947px #fff, 617px 880px #fff, 240px 403px #fff;
              }
              
              #stars3:after {
                  content: '';
                  position: absolute;
                  width: 3px;
                  height: 3px;
                  background: transparent;
                  box-shadow: 387px 1878px #fff, 760px 1564px #fff, 1487px 999px #fff,
                  948px 1828px #fff, 1977px 1001px #fff, 1284px 1963px #fff, 656px 284px #fff,
                  1268px 1635px #fff, 1820px 598px #fff, 642px 1900px #fff, 296px 57px #fff,
                  921px 1620px #fff, 476px 1858px #fff, 658px 613px #fff, 1171px 1363px #fff,
                  1419px 283px #fff, 1037px 731px #fff, 503px 663px #fff, 1562px 463px #fff,
                  383px 1197px #fff, 1171px 1233px #fff, 876px 1768px #fff, 856px 1615px #fff,
                  1375px 1924px #fff, 1725px 918px #fff, 952px 119px #fff, 768px 1212px #fff,
                  992px 1462px #fff, 1929px 717px #fff, 1947px 755px #fff, 1818px 1123px #fff,
                  1896px 1672px #fff, 460px 198px #fff, 256px 271px #fff, 752px 544px #fff,
                  1222px 1859px #fff, 1851px 443px #fff, 313px 1858px #fff, 709px 446px #fff,
                  1546px 697px #fff, 674px 1155px #fff, 1112px 130px #fff, 355px 1790px #fff,
                  1496px 974px #fff, 1696px 480px #fff, 1316px 1265px #fff, 1645px 1063px #fff,
                  1182px 237px #fff, 427px 1582px #fff, 859px 253px #fff, 458px 939px #fff,
                  1517px 1644px #fff, 1943px 60px #fff, 212px 1650px #fff, 966px 1786px #fff,
                  473px 712px #fff, 130px 76px #fff, 1417px 1186px #fff, 909px 1580px #fff,
                  1913px 762px #fff, 204px 1143px #fff, 1998px 1057px #fff, 1468px 1301px #fff,
                  144px 1676px #fff, 21px 1601px #fff, 382px 1362px #fff, 912px 753px #fff,
                  1488px 1405px #fff, 802px 156px #fff, 174px 550px #fff, 338px 1366px #fff,
                  1197px 774px #fff, 602px 486px #fff, 682px 1877px #fff, 348px 1503px #fff,
                  407px 1139px #fff, 950px 1400px #fff, 922px 1139px #fff, 1697px 293px #fff,
                  1238px 1281px #fff, 1038px 1197px #fff, 376px 1889px #fff,
                  1255px 1680px #fff, 1008px 1316px #fff, 1538px 1447px #fff,
                  1186px 874px #fff, 1967px 640px #fff, 1341px 19px #fff, 29px 1732px #fff,
                  16px 1650px #fff, 1021px 1075px #fff, 723px 424px #fff, 1175px 41px #fff,
                  494px 1957px #fff, 1296px 431px #fff, 175px 1507px #fff, 831px 121px #fff,
                  498px 1947px #fff, 617px 880px #fff, 240px 403px #fff;
              }
              
              
              @keyframes animStar {
                  from {
                      transform: translateY(0px);
                  }
                  to {
                      transform: translateY(-2000px);
                  }
              }
             
                .pre,.next{
                    width:100px;
                    height:40px;
                    cursor:pointer;
                    border: 5px solid #15f4ee;
                    border-radius:10px;
                    background:black;
                    color: #15f4ee;
                  font-family:poppins;
                  font-weight:400;
                  text-transform:uppercase;
                  transition:1.5s;

                }
                .pre:hover,.next:hover{
                  box-shadow:0 5px 50px 0 #15f4ee inset, 0 5px 50px #15f4ee, 0 5px 50px #15f4ee,0 5px 50px #15f4ee;  
                  text-shadow:0 0 5px #15f4ee,0 0 5px #15f4ee;
                  
                }
                .pre{
                  margin-left:20rem;
                  margin-right:5rem;
                }
                .problems:hover {
                    border-color: #00bcd4;
                    cursor: pointer;
                }
                .tags {
                    margin-top: 2rem;
                    outline: none;
                    -webkit-appearance: none;
                    background: none;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 0.7rem;
                    width: 60%;
                    font-size: 1.1em;
                    border-radius: 4px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
                }
                .rating-sel {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .rating-field {
                    width: 35%;
                    margin-right: 0.5rem;
                    margin-left: 0.5rem;
                    font-size: 1.2em;
                    outline: none;
                    border: none;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    font-size: 1.2em;
                    padding: 0.7rem;
                    border-radius: 4px;
                    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);
                }
                .gen-btn {
                    
                    margin-top: 1.5rem;
                    width: 60%;
                    border: 5px solid #15f4ee;
                    outline: none;
                    background: black;
                    color: #15f4ee;
                    font-size: 1.1em;
                    font-family:poppins;
                    font-weight:400;
                    border-radius: 100px;
                    padding: 0.7rem;
                    cursor: pointer;
                    text-transform:uppercase;
                    letter-spacing:15px;
                    transition:1.5s;
                }
                .gen-btn:hover{
                  box-shadow:0 5px 50px 0 #15f4ee inset, 0 5px 50px #15f4ee, 0 5px 50px #15f4ee,0 5px 50px #15f4ee;  
                  text-shadow:0 0 5px #15f4ee,0 0 5px #15f4ee;
                }
                .warning {
                    margin-top: 1rem;
                    color: red;
                    font-weight: bold;
                }
               
                .container {
                   width:100%;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                main {
                  width:100%;
                  background:radial-gradient(ellipse at bottom,#1b2735 0%,#090a0f 100%);
                    padding: 5rem 0;
                    padding-bottom: 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background:#14213d;
                }
                footer img {
                    margin-left: 0.5rem;
                }
                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                a {
                    color: inherit;
                    text-decoration: none;
                }
                .title a {
                    color: #ffba08;
                    text-decoration: none;
                }
                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }
                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }
                .title,
                 {
                    text-align: center;
                }        
            `}</style>
      <style jsx global>{`
                html,
                body {
                    
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
    </div>
  )
}