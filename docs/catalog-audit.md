# Auditoria do catálogo — 14/09/2026

Base: commit a03bb2bf0970e82de81e6a8e891d676d9a9906f6.

As 153 entradas originais tinham arquivo MP3 correspondente; 94 usavam `iuHeart-2x.gif` como capa. O teste `if (song.cover)` aceitava esse GIF e impedia qualquer recuperação. O gerador usava o primeiro resultado de busca sem confirmar artista ou lançamento, não preservava anos e reintroduzia duplicatas.

O catálogo revisado reúne 146 gravações, com sete pares de entradas duplicadas. Os arquivos antigos permanecem disponíveis para compatibilidade. Daydream e Walk with me, girl possuem pares com o mesmo blob Git/LFS; os outros cinco pares repetem a mesma faixa com variação de título/arquivo. Versões japonesas, coreanas, acústicas, de piano e rock continuam distintas.

As capas são arquivos JPEG em `covers/`, um por lançamento. A imagem remota revisada do mesmo álbum é usada somente se a local falhar. Não há busca aproximada em tempo de jogo. O GIF decorativo do site permanece como decoração.

`catalog/catalog.json` é a fonte de metadados; `node generate-db.js` gera o banco sem acessar serviços de busca e rejeita faixas não revisadas. O antigo workflow de renomeação foi substituído por validação porque podia invalidar caminhos no banco e sobrescrever arquivos com nomes normalizados iguais.

O calendário conserva a lista original de 153 caminhos até 14/09/2026, resolvendo duplicatas para a entrada canônica. A partir de 15/09/2026 usa a lista sem duplicatas. Adições posteriores precisam de uma nova lista com data futura; listas já ativas não devem mudar. O progresso também passa a guardar o arquivo da música.

Unknown Planet e Dear my crazy soulmate estão descritas em `catalog/pending-songs.json`. O importador usa os vídeos do canal oficial da IU, converte com yt-dlp/ffmpeg e verifica duração e decodificação integral antes de ativar cada faixa. O resultado efetivo da execução está em `catalog/import-status.json`: faixas que não puderem ser baixadas permanecem pendentes e fora do sorteio.

## Mapeamento das 153 entradas originais

| # | Título original | Lançamento revisado | Ano | Resultado |
|---|---|---|---|---|
| 1 | 4AM | Last Fantasy | 2011 | capa corrigida/padronizada |
| 2 | A Beautiful Person (Feat. Balming Tiger Feat. Balming Tiger | A Flower Bookmark 3 | 2025 | álbum/ano corrigido; título corrigido |
| 3 | A Dreamer (A DREAMER) | Growing Up | 2009 | conferida; capa local |
| 4 | A Gloomy Clock (feat. Jong-hyun)(feat.of SHINee)) | Modern Times | 2013 | título corrigido |
| 5 | A Lost Child (ACOUSTIC VER.) (미아 (ACOUSTIC VER.)) | Growing Up | 2009 | conferida; capa local |
| 6 | above the time (시간의 바깥) | Love Poem - EP | 2019 | conferida; capa local |
| 7 | Ah puh (어푸 (Ah puh)) | LILAC | 2021 | conferida; capa local |
| 8 | Autumn morning (가을 아침) | A Flower Bookmark 2 | 2017 | conferida; capa local |
| 9 | Bad Day (싫은 날) | Modern Times | 2013 | conferida; capa local |
| 10 | BBIBBI (삐삐) | BBIBBI - Single | 2018 | conferida; capa local |
| 11 | Beautiful Dancer | Can You Hear Me? - EP | 2013 | GIF substituído; álbum/ano corrigido |
| 12 | Between the lips (50cm) (입술 사이(50cm)) | Modern Times | 2013 | conferida; capa local |
| 13 | Black Out (Black Out) | Palette | 2017 | conferida; capa local |
| 14 | Blueming (Blueming) | Love Poem - EP | 2019 | conferida; capa local |
| 15 | Boo (BOO) | Growing Up | 2009 | conferida; capa local |
| 16 | Boom Ladi Dadi (꿍따리 샤바라 (feat. 클론)) | A Flower Bookmark | 2014 | conferida; capa local |
| 17 | By the stream (개여울) | A Flower Bookmark 2 | 2017 | conferida; capa local |
| 18 | Bye, Summer (바이, 썸머) | Bye, Summer - Single | 2025 | álbum/ano corrigido |
| 19 | Can't Love You Anymore (With OHHYUK) | Palette | 2017 | capa corrigida/padronizada |
| 20 | Celebrity (Celebrity) | Celebrity - Single | 2021 | conferida; capa local |
| 21 | Coin (Coin) | LILAC | 2021 | conferida; capa local |
| 22 | Crayon (크레파스) | Modern Times – Epilogue | 2013 | conferida; capa local |
| 23 | Daydream (feat. Yang Hee-eun) (한낮의 꿈 (feat.양희은)) | Modern Times – Epilogue | 2013 | conferida; capa local |
| 24 | Daydream (feat.Yang Hee-eun) (한낮의 꿈 (FEAT.양희은)) | Modern Times – Epilogue | 2013 | duplicata → Daydream (feat. Yang Hee-eun) (한낮의 꿈 (feat.양희은)) |
| 25 | Dear Name (이름에게) | Palette | 2017 | conferida; capa local |
| 26 | dlwlrma (이 지금) | Palette | 2017 | conferida; capa local |
| 27 | Don’t Like Her (그 애 참 싫다) | Spring of Twenty | 2012 | conferida; capa local |
| 28 | Drama (드라마) | Pieces - EP | 2021 | conferida; capa local |
| 29 | Dreams in summer night (여름밤의 꿈) | A Flower Bookmark | 2014 | conferida; capa local |
| 30 | eight(Prod.&Feat. SUGA of BTS) | eight - Single | 2020 | conferida; capa local |
| 31 | Empty Cup (빈 컵 (Empty Cup)) | LILAC | 2021 | conferida; capa local |
| 32 | Ending Scene (이런 엔딩) | Palette | 2017 | conferida; capa local |
| 33 | Epilogue (에필로그) | LILAC | 2021 | conferida; capa local |
| 34 | Every End of the Day (하루 끝) | Spring of Twenty | 2012 | conferida; capa local |
| 35 | Every Sweet Day (Every Sweet Day) | Growing Up | 2009 | conferida; capa local |
| 36 | Everybody has secrets (feat. GAIN) (누구나 비밀은 있다 (feat.가인 of Brown Eyed Girls)) | Modern Times – Epilogue | 2013 | conferida; capa local |
| 37 | Everyday with you (매일 그대와) | A Flower Bookmark 2 | 2017 | conferida; capa local |
| 38 | Everything's Alright (feat. Kim Hyun-Cheol) (Everything's Allright (feat. 김현철)) | Last Fantasy | 2011 | conferida; capa local |
| 39 | Face To Face (After Looking At) (마주보기 (바라보기 그 후)) | Growing Up | 2009 | conferida; capa local |
| 40 | Fairytale | Can You Hear Me? - EP | 2013 | capa corrigida/padronizada; álbum/ano corrigido |
| 41 | Feel So Good (Feel So Good) | Growing Up | 2009 | conferida; capa local |
| 42 | first love (첫사랑이죠) | First Love - Single | 2010 | álbum/ano corrigido |
| 43 | Flower (꽃) | A Flower Bookmark | 2014 | conferida; capa local |
| 44 | Flu (Flu) | LILAC | 2021 | conferida; capa local |
| 45 | Follow The Moon | Monday Afternoon - EP | 2013 | GIF substituído; álbum/ano corrigido |
| 46 | Four Without Me (나 말고 넷) | Growing Up | 2009 | conferida; capa local |
| 47 | Friday (feat.Jang Yi-jeong) (금요일에 만나요 (feat.장이정 of HISTORY)) | Modern Times – Epilogue | 2013 | GIF substituído |
| 48 | Full Stop (마침표) | Palette | 2017 | conferida; capa local |
| 49 | Glasses (안경) | CHAT-SHIRE | 2015 | GIF substituído |
| 50 | Good Day (Japanese Version) | Good Day (Japanese Version) - EP | 2012 | GIF substituído; álbum/ano corrigido |
| 51 | Good day (좋은 날) | Real | 2010 | conferida; capa local |
| 52 | Graduation Day (졸업하는 날) | Growing Up | 2009 | GIF substituído; álbum/ano corrigido |
| 53 | Havana (Havana) | Modern Times | 2013 | GIF substituído |
| 54 | heart (마음) | Heart - Single | 2015 | GIF substituído |
| 55 | heart beating date (두근 두근 데이트) | IU...IM | 2009 | álbum/ano corrigido |
| 56 | Hi spring Bye (봄 안녕 봄) | LILAC | 2021 | conferida; capa local |
| 57 | Holding A Star In My Heart (feat. Kim Gwang-Jin) (별을 찾는 아이 (feat. 김광진)) | Last Fantasy | 2011 | GIF substituído; álbum/ano corrigido |
| 58 | Holssi (홀씨) | The Winning | 2024 | conferida; capa local |
| 59 | I stan U (관객이 될게 (I stan U)) | The Winning | 2024 | conferida; capa local |
| 60 | In a room alone (혼자 있는 방) | Real | 2010 | GIF substituído |
| 61 | Jam Jam (잼잼) | Palette | 2017 | conferida; capa local |
| 62 | Knees (무릎) | CHAT-SHIRE | 2015 | conferida; capa local |
| 63 | L'amant (라망 (L'amant)) | Last Fantasy | 2011 | conferida; capa local |
| 64 | Last Fantasy (Last Fantasy) | Last Fantasy | 2011 | conferida; capa local |
| 65 | Last night story (어젯밤 이야기) | A Flower Bookmark 2 | 2017 | conferida; capa local |
| 66 | Last Scene (Feat. Wonstein) (Last Scene (Feat. 원슈타인)) | A Flower Bookmark 3 | 2025 | álbum/ano corrigido |
| 67 | LILAC (라일락) | LILAC | 2021 | conferida; capa local |
| 68 | LILAC | LILAC | 2021 | GIF substituído; duplicata → LILAC (라일락) |
| 69 | Looking at you (바라보기) | Growing Up | 2009 | conferida; capa local |
| 70 | lost child (미아) | Lost and Found | 2008 | GIF substituído |
| 71 | Love Alone (그렇게 사랑은) | Palette | 2017 | GIF substituído; álbum/ano corrigido |
| 72 | Love attack (LOVE ATTACK) | IU...IM | 2009 | GIF substituído; álbum/ano corrigido |
| 73 | Love Letter (러브레터) | Pieces - EP | 2021 | GIF substituído |
| 74 | Love of B (을의 연애) | Modern Times | 2013 | conferida; capa local |
| 75 | Love poem (Love poem) | Love Poem - EP | 2019 | GIF substituído |
| 76 | Love wins all (Love wins all) | The Winning | 2024 | GIF substituído |
| 77 | Lullaby (자장가) | Love Poem - EP | 2019 | GIF substituído |
| 78 | marshmallow (마쉬멜로우) | IU...IM | 2009 | GIF substituído |
| 79 | Meaning of you (너의 의미 (feat. 김창완)) | A Flower Bookmark | 2014 | GIF substituído |
| 80 | Merry Christmas ahead (feat.Chundung) (미리 메리 크리스마스 (feat.천둥 of MBLAQ)) | Real | 2010 | GIF substituído |
| 81 | Midnight Walk (밤 산책) | When Life Gives You Tangerines OST, Chapter 3 | 2025 | GIF substituído; álbum/ano corrigido |
| 82 | Modern Times (Modern Times) | Modern Times | 2013 | GIF substituído; álbum/ano corrigido |
| 83 | Monday Afternoon | Monday Afternoon - EP | 2013 | GIF substituído; álbum/ano corrigido |
| 84 | Mother Nature (H₂O) (Mother Nature (H₂O)) | Mother Nature (H₂O) - Single | 2022 | GIF substituído |
| 85 | My old story (나의 옛날이야기) | A Flower Bookmark | 2014 | GIF substituído |
| 86 | My sea (아이와 나의 바다) | LILAC | 2021 | GIF substituído |
| 87 | Never Ending Story (Never Ending Story) | A Flower Bookmark 3 | 2025 | GIF substituído; álbum/ano corrigido |
| 88 | New World | Can You Hear Me? - EP | 2013 | GIF substituído; álbum/ano corrigido |
| 89 | Next Stop (정거장) | Pieces - EP | 2021 | GIF substituído |
| 90 | Nitpicking (잔소리 (with 2AM 슬옹)) | Nitpicking - Single | 2010 | GIF substituído; álbum/ano corrigido |
| 91 | Not like this (이게 아닌데) | Real | 2010 | GIF substituído |
| 92 | Obliviate (OBLIVIATE) | Modern Times | 2013 | GIF substituído |
| 93 | October 4th (10월 4일) | A Flower Bookmark 3 | 2025 | GIF substituído; álbum/ano corrigido |
| 94 | Only I didn't know (With Pianist | Real+ | 2011 | GIF substituído; título corrigido |
| 95 | Only I didn't know (나만 몰랐던 이야기) | Real+ | 2011 | GIF substituído |
| 96 | Palette (feat. G-DRAGON) (팔레트 (feat. G-DRAGON)) | Palette | 2017 | GIF substituído |
| 97 | Palette (feat. G-DRAGON) | Palette | 2017 | GIF substituído; duplicata → Palette (feat. G-DRAGON) (팔레트 (feat. G-DRAGON)) |
| 98 | Peach (복숭아) | Spring of Twenty | 2012 | GIF substituído |
| 99 | Pierrot laughs at us (삐에로는 우릴 보고 웃지) | A Flower Bookmark | 2014 | GIF substituído |
| 100 | pitiful (가여워) | Growing Up | 2009 | GIF substituído |
| 101 | Rain Drop (Japanese Version) | Good Day (Japanese Version) - EP | 2012 | GIF substituído; álbum/ano corrigido |
| 102 | Rain Drop (Rain Drop) | Nitpicking - Single | 2010 | GIF substituído; álbum/ano corrigido |
| 103 | Red Queen (feat.Zion.T) (RED QUEEN (FEAT. ZION.T)) | CHAT-SHIRE | 2015 | GIF substituído |
| 104 | Red Sneakers (빨간 운동화) | A Flower Bookmark 3 | 2025 | GIF substituído; álbum/ano corrigido |
| 105 | Scary Fairy Tale (잔혹동화) | Real+ | 2011 | GIF substituído |
| 106 | Sea Of Moonlight (달빛바다) | LOEN TREE Summer Story | 2012 | GIF substituído |
| 107 | Secret (비밀) | Last Fantasy | 2011 | GIF substituído |
| 108 | Secret Garden (비밀의 화원) | A Flower Bookmark 2 | 2017 | GIF substituído |
| 109 | Shh.. (Feat. HYEIN, WONSUN JOE & Special Narr. Patti Kim) (Shh.. (Feat. 혜인(HYEIN), 조원선... | The Winning | 2024 | GIF substituído; título corrigido |
| 110 | Shoes (새 신발) | CHAT-SHIRE | 2015 | GIF substituído |
| 111 | Shopper (Shopper) | The Winning | 2024 | GIF substituído |
| 112 | Shounen Jidai | You & I (Japanese Version) - Single | 2012 | GIF substituído; álbum/ano corrigido |
| 113 | Sleeping Prince (feat. Yoon Sang) (잠자는 숲속의 왕자 (feat. 윤상)) | Last Fantasy | 2011 | GIF substituído |
| 114 | Sleepless rainy night (잠 못 드는 밤 비는 내리고) | A Flower Bookmark 2 | 2017 | GIF substituído |
| 115 | Sogyeokdong | Sogyeokdong - Single | 2014 | GIF substituído |
| 116 | Someday | Dream High OST | 2011 | GIF substituído |
| 117 | Square's dream (네모의 꿈) | A Flower Bookmark 3 | 2025 | GIF substituído; álbum/ano corrigido |
| 118 | strawberry moon (strawberry moon) | strawberry moon - Single | 2021 | GIF substituído |
| 119 | Taking a traing | IU...IM | 2009 | GIF substituído; título corrigido |
| 120 | Teacher (feat. Ra.D) (Teacher (feat. Ra.D)) | Last Fantasy | 2011 | GIF substituído |
| 121 | Tear drops in the morning | IU...IM | 2009 | GIF substituído; álbum/ano corrigido |
| 122 | The Abandoned (길잃은 강아지) | Last Fantasy | 2011 | GIF substituído |
| 123 | The Age Of The Cathedrals | Can You Hear Me? - EP | 2013 | GIF substituído; álbum/ano corrigido |
| 124 | The night of the first breakup (첫 이별 그날 밤) | Real | 2010 | GIF substituído |
| 125 | The Red Shoes (분홍신) | Modern Times | 2013 | GIF substituído; álbum/ano corrigido |
| 126 | The Red Shoes | Modern Times | 2013 | GIF substituído; álbum/ano corrigido; duplicata → The Red Shoes (분홍신) |
| 127 | The shower (푸르던) | CHAT-SHIRE | 2015 | GIF substituído |
| 128 | The visitor (그 사람) | Love Poem - EP | 2019 | GIF substituído |
| 129 | Through the Night (밤편지) | Palette | 2017 | GIF substituído |
| 130 | Troll (Feat. DEAN) (돌림노래 (Feat. DEAN)) | LILAC | 2021 | GIF substituído |
| 131 | Truth | Can You Hear Me? - EP | 2013 | GIF substituído; álbum/ano corrigido |
| 132 | Twenty-three (스물셋) | CHAT-SHIRE | 2015 | GIF substituído |
| 133 | ugly duckling (미운 오리) | Lost and Found | 2008 | GIF substituído |
| 134 | ugly duckling (미운오리) | Lost and Found | 2008 | GIF substituído; duplicata → ugly duckling (미운 오리) |
| 135 | Uncle (feat. Lee Juck) (삼촌 (feat. 이적)) | Last Fantasy | 2011 | GIF substituído |
| 136 | unlucky (unlucky) | Love Poem - EP | 2019 | GIF substituído |
| 137 | voice-mail-korean | Modern Times | 2013 | GIF substituído; título corrigido |
| 138 | Voice-Mail | Can You Hear Me? - EP | 2013 | GIF substituído; álbum/ano corrigido; título corrigido |
| 139 | Wait (기다려) | Modern Times | 2013 | GIF substituído |
| 140 | Walk with me, girl (feat. Choi Baek-ho) (아이야 나랑 걷자 (feat.최백호)) | Modern Times | 2013 | GIF substituído |
| 141 | Walk with me, girl (feat.Choi Baek-ho) (아이야 나랑 걷자 (FEAT.최백호)) | Modern Times | 2013 | GIF substituído; duplicata → Walk with me, girl (feat. Choi Baek-ho) (아이야 나랑 걷자 (feat.최백호)) |
| 142 | Wallpaper Pattern (벽지무늬) | Last Fantasy | 2011 | GIF substituído |
| 143 | Well… (feat. Mario) (있잖아 (feat. 마리오)) | Growing Up | 2009 | GIF substituído |
| 144 | Well… (feat.Mario) (있잖아 (FEAT.마리오)) | Growing Up | 2009 | GIF substituído; duplicata → Well… (feat. Mario) (있잖아 (feat. 마리오)) |
| 145 | Well… (있잖아 (ROCK VER.)) | Growing Up | 2009 | GIF substituído |
| 146 | What I'm doing slow (느리게 하는 일) | Real | 2010 | GIF substituído; álbum/ano corrigido |
| 147 | When love passes by (사랑이 지나가면) | A Flower Bookmark | 2014 | GIF substituído |
| 148 | Winter Sleep (겨울잠) | Pieces - EP | 2021 | GIF substituído |
| 149 | Wisdom Tooth (사랑니) | Last Fantasy | 2011 | GIF substituído; álbum/ano corrigido |
| 150 | You & I (Japanese Version) | You & I (Japanese Version) - Single | 2012 | GIF substituído; álbum/ano corrigido |
| 151 | YOU & I (너랑 나) | Last Fantasy | 2011 | GIF substituído |
| 152 | You (너) | Pieces - EP | 2021 | GIF substituído; álbum/ano corrigido |
| 153 | Zezé (ZEZE) | CHAT-SHIRE | 2015 | GIF substituído |

## Fontes por lançamento

As URLs abaixo são as páginas usadas na conferência; o arquivo JSON também preserva o endereço exato da imagem de cada lançamento. Para lançamentos já corretamente identificados no banco original, a página da artista dá acesso à discografia. Reedições válidas (Growing Up e Modern Times – Epilogue) foram preservadas.

- [A Flower Bookmark (2014)](https://music.apple.com/us/artist/iu/409076743)
- [A Flower Bookmark 2 (2017)](https://music.apple.com/us/artist/iu/409076743)
- [A Flower Bookmark 3 (2025)](https://music.apple.com/us/artist/iu/409076743)
- [BBIBBI - Single (2018)](https://music.apple.com/us/artist/iu/409076743)
- [Bye, Summer - Single (2025)](https://music.apple.com/us/artist/iu/409076743)
- [CHAT-SHIRE (2015)](https://music.apple.com/us/artist/iu/409076743)
- [Can You Hear Me? - EP (2013)](https://music.apple.com/in/album/can-you-hear-me-ep/720582961)
- [Celebrity - Single (2021)](https://music.apple.com/us/artist/iu/409076743)
- [Dream High OST (2011)](https://music.apple.com/us/album/someday/417698253?i=417698273)
- [First Love - Single (2010)](https://music.apple.com/us/artist/iu/409076743)
- [Good Day (Japanese Version) - EP (2012)](https://music.apple.com/in/album/good-day-japanese-version-ep/720524152)
- [Growing Up (2009)](https://music.apple.com/us/artist/iu/409076743)
- [Heart - Single (2015)](https://music.apple.com/us/album/heart-single/995855731)
- [IU...IM (2009)](https://music.apple.com/us/album/iu-im/340375473)
- [LILAC (2021)](https://music.apple.com/us/artist/iu/409076743)
- [LOEN TREE Summer Story (2012)](https://music.apple.com/us/album/sea-of-moonlight/550028464?i=550028468)
- [Last Fantasy (2011)](https://music.apple.com/us/artist/iu/409076743)
- [Lost and Found (2008)](https://music.apple.com/us/album/lost-and-found-ep/1561311534)
- [Love Poem - EP (2019)](https://music.apple.com/us/artist/iu/409076743)
- [Modern Times (2013)](https://music.apple.com/us/artist/iu/409076743)
- [Modern Times – Epilogue (2013)](https://music.apple.com/us/artist/iu/409076743)
- [Monday Afternoon - EP (2013)](https://music.apple.com/in/album/monday-afternoon-ep/724922917)
- [Mother Nature (H₂O) - Single (2022)](https://music.apple.com/us/album/mother-nature-h-o-single/1607037403)
- [Nitpicking - Single (2010)](https://music.apple.com/us/album/nitpicking-single/378048652)
- [Palette (2017)](https://music.apple.com/us/artist/iu/409076743)
- [Pieces - EP (2021)](https://music.apple.com/us/artist/iu/409076743)
- [Real (2010)](https://music.apple.com/us/artist/iu/409076743)
- [Real+ (2011)](https://music.apple.com/us/album/real-single/421111521)
- [Sogyeokdong - Single (2014)](https://music.apple.com/us/album/sogyeokdong-single/925184315)
- [Spring of Twenty (2012)](https://music.apple.com/us/artist/iu/409076743)
- [The Winning (2024)](https://music.apple.com/us/artist/iu/409076743)
- [Unknown Planet - Single (2026)](https://music.apple.com/us/album/unknown-planet-single/6808583617)
- [When Life Gives You Tangerines OST, Chapter 3 (2025)](https://music.apple.com/us/album/when-life-gives-you-tangerines-original-soundtrack/1802808900)
- [You & I (Japanese Version) - Single (2012)](https://music.apple.com/in/album/you-i-japanese-version-single/720589620)
- [eight - Single (2020)](https://music.apple.com/us/artist/iu/409076743)
- [strawberry moon - Single (2021)](https://music.apple.com/us/album/strawberry-moon-single/1590459601)

## Manutenção

1. Atualize os metadados revisados em `catalog/catalog.json`.
2. Para as duas faixas pendentes: instale yt-dlp e ffmpeg, execute `python scripts/import-assets.py`; use `--covers-only` se desejar somente baixar capas.
3. Execute `node generate-db.js`, `npm test` e `npm run build`.
4. Faça commit dos JPEGs, MP3s por Git LFS, catálogo e banco gerado juntos. Nunca acrescente um caminho de áudio sem validar seu arquivo.

Validação inicial: 36 JPEGs baixados; 21 testes passaram; build concluído. Os downloads de áudio continuam condicionados à execução registrada em `catalog/import-status.json`.
