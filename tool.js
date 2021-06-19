class Tool{

    toKhNum(number) {
        const khNum = {'0':'០', '1':'១', '2':'២', '3':'៣', '4':'៤', '5':'៥', '6':'៦', '7':'៧', '8':'៨', '9':'៩'};
        var stringNum = number.toString();
        var khString = '';
       
        for(var i in stringNum){
          var char = stringNum.charAt(i);
          khString += khNum[char];
        }
       
        return khString;
    }
      
    getKhDate(rawDate){
        this.KhmerDays = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
        this.KhmerMonths = ['មករា', 'កុម្ភៈ', 'មិនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
        var date = new Date(rawDate);
        this.month = date.getMonth();
        this.day = date.getDay();
        this.daym = this.toKhNum(date.getDate());
        this.year = this.toKhNum(date.getFullYear());
        this.time = date.toLocaleTimeString();
        return ('ថ្ងៃ '+this.KhmerDays[this.day]+' ទី '+this.daym+' '+this.KhmerMonths[this.month]+' '+this.year)
    }

}

module.exports = Tool