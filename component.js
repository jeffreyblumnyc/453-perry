/* Page data + logic exported from the design canvas. */
class DCLogic {
  constructor(props) { this.props = props || {}; this.state = {}; }
  setState(s) { Object.assign(this.state, s); if (window.__rerender) window.__rerender(); }
}
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { cat: 'all', pos: {} };
  }
  pairVals(p, key) {
    var self = this;
    var pos = this.state.pos[key];
    if (pos === undefined) pos = 50;
    return {
      before: '/_blob/' + p[0], after: '/_blob/' + p[1],
      pos: pos, clip: 100 - pos, rows: p[5] ? 'span 2' : 'span 1',
      caption: p[2] + ' → ' + p[3] + ' · ' + p[4],
      beforeAlt: p[4] + ', existing, photo ' + p[2],
      afterAlt: p[4] + ', proposed render ' + p[3],
      sliderLabel: 'Compare before and after: ' + p[4],
      move: function (e) {
        var v = Number(e && e.target ? e.target.value : 50);
        var next = Object.assign({}, self.state.pos); next[key] = v;
        self.setState({ pos: next });
      }
    };
  }
  renderVals() {
    var B = '/_blob/';
    var cats = [
      { id: 'front', code: 'A-101', label: 'Front view', desc: 'Arrival and porch: charcoal vertical siding, a cedar-lined soffit with recessed lights, black-framed glazing, cable-rail decking and tall grasses.',
        imgs: [['f5db4a6ef1f9ddbfe63e044d924a5291',0],['c261d0d78dd31430c0f036669a3cefbb',1],['4cb3336c291d69cc7259b6fed31785af',0],['c9dbef0cf72354a3e691a2fa2c97d5a7',0],['80a1be4a88da708f018facb29e13f280',0],['4ba9a1d544ddb9dce3212cc1db753cc4',0],['10bb8e11ce19e77485a928ea5e5bf2a2',0],['0dc3d3bc410e914475e4791139c456d6',0],['dd61436e9bec9181ab52a106831c4cfc',1],['1dc0a798746c8b91b09908fceb95d4b1',1]] },
      { id: 'side', code: 'A-102', label: 'Side view', desc: 'Quiet gable ends with few, deliberate openings; the detached garage reads as a sibling volume.',
        imgs: [['8629b858beec65d57921a1facfa890cd',0],['9660154f087ff52bde89d91b9df82baf',1]] },
      { id: 'back', code: 'A-103', label: 'Back view', desc: 'The garden façade: a full-height glazed gable, a glass-box bump-out, the long deck and lawn stepping down behind dry-stone terraces.',
        imgs: [['99671361490fefedb60526f6c74ee154',0],['0df9bb4c2e5ddf327a01fc9dc9abce3c',0],['bc00a6bd72e9be7cd185de84a1f330ae',0],['8d5cadc15fb4ed57af88945a00aa2fcd',1],['943fd310ac7596551b2817663c347162',1],['c142588a3e0813a54d70739b8f78a350',0],['e7cd252dde8b54f72b432bf06b4ccbe1',1],['8ab26dd33304d18d994bf882629764e0',0],['fb79acbe207f6212206205a6c33e13ea',1],['f8d10a8887a2205c7e532f831f9134c1',0],['871a049a859aae283a2f9eed7eab37cc',0]] },
      { id: 'garage', code: 'A-201', label: 'Garage', desc: 'A workshop garage: exposed timber beams, linear lighting, sealed concrete, wall-hung kayaks and bikes, built-in storage, and the open stair up to the studio loft.',
        imgs: [['76195f5d161643df0e7f3f6fb80a862a',0],['2862417685b3a17747dbf13191fb0718',1],['bceadf3c52f40e168735d5b013f460a7',1,'A-202.03']] },
      { id: 'studio', code: 'A-202', label: 'Studio · Music garage', desc: 'The loft above the garage: a vaulted studio with a gable picture window, wall-to-wall records and books, and a glass-railed open stair.',
        imgs: [['f7fb6621e63cbd2cb3f311fe56f32ae0',0],['fd8096f49918520a42dc2111b1675e91',0],['bceadf3c52f40e168735d5b013f460a7',1]] },
      { id: 'breezeway', code: 'A-203', label: 'Breezeway · Mudroom', desc: 'The glazed link between house and garage: built-in storage, a bench, concrete floor and a cedar ceiling. Also seen from outside in the side and rear views.',
        imgs: [['2f8d6b7d952b9ec34932b50a83d75fed',1],['c261d0d78dd31430c0f036669a3cefbb',1,'A-101.02'],['943fd310ac7596551b2817663c347162',1,'A-103.05'],['e7cd252dde8b54f72b432bf06b4ccbe1',1,'A-103.07']] },
      { id: 'interior', code: 'A-301', label: 'Interior ground floor', desc: 'A floating oak stair in a glass enclosure; dining framed by corner glazing onto the woods.',
        imgs: [['39a19f026229d048fc39cd964988af9b',0],['88838293f3c813a4c4f85e69067c4cc6',0]] },
      { id: 'bath', code: 'A-303', label: 'Bathrooms · ground floor', desc: 'Both ground-floor bathrooms in one material: large-format pale stone tile on floors and wainscot, white plaster above, integrated stone sinks and matte-black fittings. Primary bath: floating double vanity, toilet niche and a glass-fronted walk-in shower. Hall bath: tiled tub with a glass screen.',
        imgs: [['80896f73c5c4e54dc0f5f68f86b338d9',1],['4990f6228dfac77a6afa39640ce302d6',1],['3365e0c900f27920520395049e0106e7',1],['b36d0518759f6dd01224a0dd41097849',1],['339d35f6115d3f400ccbcf36e6cc9f07',1]] },
      { id: 'second', code: 'A-302', label: 'Second floor', desc: 'The unfinished attic becomes a primary suite: white-painted rafters, a run of skylights, low oak built-ins along the knee walls, wide oak boards and an en-suite bath in pale stone.',
        imgs: [['005119495f5856849500466fcf4373c0',1],['875bf48db6f060212a054b1d094b1ab0',1],['a16eb5429186adc1bee5ccbe4c26b535',1]] },
      { id: 'basement', code: 'A-401', label: 'Basement', desc: 'A walk-out lower level: oak floors, built-ins, a lounge and games room, with sliders onto the lawn.',
        imgs: [['ad0faa9e43bcabc2a8dcd446c70ed6d3',0],['8716e84cce0e76b107977639ffc7f796',0],['8fc68fe6b8616c666ed9ee744aa135d4',0]] },
      { id: 'pool', code: 'A-501', label: 'Natural pool · wish list', desc: 'Outside the remodel scope — a bucket-list idea. The overgrown woodland edge beside the play area becomes a natural swimming pool: planted regeneration margins with iris and loosestrife, water lilies, a glass-clear swim zone with submerged stone steps, boulders, stepping stones and a small timber deck.',
        imgs: [['7a8baff6bc1918876a8b98772fa28c0a',0],['806466f52fbe157d7243b31308596967',0],['28f87bbe4e8b3584e52eef04c09c1044',1],['57ffae5454c984d9c8ec0f9762e71e0e',1],['cdf0b470eee972afdf756dd342160560',0],['b9baa6661f41c85435400b8ec29325ab',0]] }
    ];
    var self = this;
    var cur = this.state.cat;
    var seen = {};
    cats.forEach(function (c) { c.imgs.forEach(function (im) { seen[im[0]] = 1; }); });
    var total = Object.keys(seen).length;
    var tabs = [{ id: 'all', label: 'All', count: total }].concat(cats.map(function (c) { return { id: c.id, label: c.label, count: c.imgs.length }; }))
      .map(function (t) { return { label: t.label, count: t.count, on: t.id === cur, off: t.id !== cur, pick: function () { self.setState({ cat: t.id }); } }; });
    var groups = cats.filter(function (c) { return cur === 'all' || c.id === cur; }).map(function (c) {
      return {
        code: c.code, label: c.label, desc: c.desc,
        countLabel: c.imgs.length + (c.imgs.length === 1 ? ' render' : ' renders'),
        items: c.imgs.map(function (im, i) {
          var n = (i + 1 < 10 ? '0' : '') + (i + 1);
          return { src: B + im[0], tall: im[1] === 1, wide: im[1] !== 1, ref: im[2] || (c.code + '.' + n), alt: c.label + ' render ' + n };
        })
      };
    });
    // [before blob, after blob, photo, render ref, label, tall]
    var PAIRS = [
      ['6d93b898bda83883fcf39a81147f182c','10bb8e11ce19e77485a928ea5e5bf2a2','IMG_2847','A-101.07','Front, from the drive',0],
      ['c4e8911f1ad0eadbda0aaff35530b797','f5db4a6ef1f9ddbfe63e044d924a5291','IMG_2845','A-101.01','Front porch',0],
      ['03cbc7eedd469c9fc3bc583679a196d0','c9dbef0cf72354a3e691a2fa2c97d5a7','Front porch','A-101.04','Front door and porch',0],
      ['3e27b0df7109074120cb6c6226c31707','0dc3d3bc410e914475e4791139c456d6','IMG_2846','A-101.08','Porch rail and planting',0],
      ['ac4f6f696892107885eaae449373b358','c261d0d78dd31430c0f036669a3cefbb','IMG_2867','A-101.02','Side passage',1],
      ['fe15a4793e01598fa132c74d32029e2d','80a1be4a88da708f018facb29e13f280','IMG_2848','A-101.05','Garage, from the walk',0],
      ['e8f71e50bcd12c4e88a3bde386c334b1','4ba9a1d544ddb9dce3212cc1db753cc4','IMG_2862','A-101.06','Garage doors',0],
      ['11864ae62c0c28c621615de1db06a9b0','dd61436e9bec9181ab52a106831c4cfc','IMG_2909','A-101.09','Through the woods',1],
      ['91551551ec607c8d20871188fab75ebd','1dc0a798746c8b91b09908fceb95d4b1','IMG_2908','A-101.10','From the tree line',1],
      ['def560f983ea0a77dac9346861f59c0c','8629b858beec65d57921a1facfa890cd','IMG_2904','A-102.01','Side gable',0],
      ['e3075fcfbe3db9c41da16eb4e5ff7b55','9660154f087ff52bde89d91b9df82baf','IMG_2868','A-102.02','Garage side',1],
      ['b695c525e3d2f8e0269817bd53c03a37','bc00a6bd72e9be7cd185de84a1f330ae','IMG_2869','A-103.02','Rear, from the lower lawn',0],
      ['e6e438750ca977c2021a316e9427499e','0df9bb4c2e5ddf327a01fc9dc9abce3c','IMG_2841','A-103.01','Rear corner and deck stair',0],
      ['fb961c0b40b9f973ef9679626c6531d0','f8d10a8887a2205c7e532f831f9134c1','IMG_2842','A-103.10','Deck stair',0],
      ['e77d360930e12ac6ebeea477bd6dffbb','8ab26dd33304d18d994bf882629764e0','IMG_2855','A-103.08','Rear elevation',0],
      ['b32ed24f5865529b1c8559874b63e43f','c142588a3e0813a54d70739b8f78a350','IMG_2866','A-103.06','Deck and sliders',0],
      ['0f1cc4ae153acff37c3fc539d3ce0621','943fd310ac7596551b2817663c347162','IMG_2840','A-103.05','Rear porch → glass box',1],
      ['b8ddf841df5f1ac6995a5e826288b58a','e7cd252dde8b54f72b432bf06b4ccbe1','IMG_2865','A-103.07','Glass box, side',1],
      ['22ccc0b03548ec736233b632718bf15f','fb79acbe207f6212206205a6c33e13ea','IMG_2905','A-103.09','Rear, through the trees',1],
      ['18ffa433ee8359c1cf02fadf19a65281','76195f5d161643df0e7f3f6fb80a862a','IMG_2784','A-201.01','Garage interior',0],
      ['983ca7ecad8ae33178e42e7573ef03b1','2862417685b3a17747dbf13191fb0718','IMG_2786','A-201.02','Garage, toward the back wall',1],
      ['4c157a4172121b18831f9a4cc801009c','fd8096f49918520a42dc2111b1675e91','IMG_2778','A-202.02','Garage loft → studio, gable',0],
      ['d162a8ef73bd4b23028215310cb24e4b','f7fb6621e63cbd2cb3f311fe56f32ae0','IMG_2780','A-202.01','Garage loft → studio, records',0],
      ['a3a702c8af4935ecba8e5f9f01b185e5','2f8d6b7d952b9ec34932b50a83d75fed','IMG_2853','A-203.01','Breezeway → mudroom',1],
      ['23d8fea929b50e723221a7296a254cca','88838293f3c813a4c4f85e69067c4cc6','IMG_2861','A-301.02','Dining',0],
      ['4a22a5f88d5e89bde6f9195fd18ef395','80896f73c5c4e54dc0f5f68f86b338d9','Primary bath','A-303.01','Pedestal sinks → floating double vanity',1],
      ['1b5865b722c47a03a05765c92e046a61','4990f6228dfac77a6afa39640ce302d6','Primary bath','A-303.02','Toilet niche',1],
      ['adc0dabf9795fc2201e1973c48ee3485','3365e0c900f27920520395049e0106e7','Primary bath','A-303.03','Open shower → glass walk-in',1],
      ['eac3b3a79c15ca5ed2bc3efb5816de7c','339d35f6115d3f400ccbcf36e6cc9f07','Hall bath','A-303.05','Vanity and pocket door',1],
      ['65910b544e1755cd2d621f6ca9438a7b','005119495f5856849500466fcf4373c0','IMG_2774','A-302.01','Attic → primary suite, long view',1],
      ['70ff7d476275b184078483ea5b92e7d1','875bf48db6f060212a054b1d094b1ab0','IMG_2775','A-302.02','Attic → primary suite, gable end',1],
      ['db2a717f79bbf0a27fc469de266b3abb','a16eb5429186adc1bee5ccbe4c26b535','IMG_2776','A-302.03','Attic → primary suite, dormer side',1],
      ['9477e09182b94685ca0b7a623a6d7a4e','ad0faa9e43bcabc2a8dcd446c70ed6d3','IMG_2788','A-401.01','Basement → family room',0],
      ['fa819a635550179ba314c6e297bd26c2','8716e84cce0e76b107977639ffc7f796','IMG_2791','A-401.02','Basement → walk-out',0],
      ['3aa8d61f261b155d69bf9450120d646f','8fc68fe6b8616c666ed9ee744aa135d4','IMG_2790','A-401.03','Basement → lounge',0],
      ['cad962b24903017f6a5aaf19a9852b9a','7a8baff6bc1918876a8b98772fa28c0a','Wish list','A-501.01','Woodland edge → natural pool',0],
      ['6bc2a32587078f2e7dfba108688cdf11','806466f52fbe157d7243b31308596967','Wish list','A-501.02','Undergrowth → swim steps',0],
      ['40a30f1559860adb51c818d41abce241','cdf0b470eee972afdf756dd342160560','Wish list','A-501.05','Pines → pool beside the play area',0]
    ];
    var feat = this.pairVals(['ea97b0a5c600d545f1a4e58c79032a21','871a049a859aae283a2f9eed7eab37cc','IMG_2839','A-103.11','Garden gable',0], 'feat');
    var pairs = PAIRS.map(function (p, i) { return self.pairVals(p, 'p' + i); });
    return { accent: this.props.accent ?? '#8A4E1F', tabs: tabs, groups: groups, feat: feat, pairs: pairs };
  }
}
window.Component = Component;
