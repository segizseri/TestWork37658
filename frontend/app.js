const App = {
  data() {
    return {
      placeholderString: 'Enter comment',
      title: 'All comments',
      inputValue: '',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZmZGU2MzY4ZjZmZjFlZGZjNjc2ODY4MDBlNDNhM2YxZjY2NjQ3ZmFlMjE4ZjQzOGVkN2IxNDQ0YmE0YTVkYjQ4MmRmZjUyOTdiMmZiYTQiLCJpYXQiOjE2NDM5NDk3MjIuNzI2MzM0LCJuYmYiOjE2NDM5NDk3MjIuNzI2MzM0LCJleHAiOjE2NzU0ODU3MjIuNjkyMzMyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.nfgeSb8M2QaSOBFaz_WnYU_f3SZsA68OXku4t9aSffdOC_Ul_Pme5G3LYANGzxEXH0KJxar2B5jFdGsSrCw5rfZAzmmhLXTxJrfCmpz3sJ8Bey5Ol-4TGmqwlUMxCnEhLVwGQIoB6RRDDyTWB3n1oONBZ8W33y_XOwhnr7KWcEx7PkIBARymVHnldLXUS33a-GoNdQJfu9sQFqTwQiVWl3rUwemgz8aCNvjttW9c_2S7QRrD-XLsQ-oz29glBz9mSCk5x5hdHjdFB0_UTXsL02VoXn5kAAdSZO_NbL9HYA80EajQWuW75lCpGl6dhtreJ1qzAuvWJPdfyHqNuxx1yW3hc6ZxDb0wXhvQB7emmmEa3gXSwwq_lxo3aOqA4PxUyzZIQrZ-DaP7IfKwivI5fFSHmY4ckX3OAm2RMkdrXUY8Uh481Z4pOKV5s15FQPlkt9MefGNwjTwe22bBFCObAiN0usPQr58L9BUCvbRzVKEsP_hH5nShzCvlap-1LRx8lbf6pKuUo0f3FV5GwGYOCG7pyuaMapZOR6MtfHsB-ZwGCh9vKO59IelujYhrfxT1vjYviFKYsCWhOz47pzuiArzFfzME7ZNpImWOxCrQ4UXUxWJq765883sNKVNHZGn2LfNUIFJ03isXpHMy-C8zZhaF3AIL87S6kbo80ag-2bI',
      url: 'http://localhost:8000/api/comment',
      notes: ['Заметка 1', 'Заметка 2'],
      comments: [],

    }
  },
  mounted() {
    this.allComments();
  },

  methods: {
    allComments() {
      axios.get(this.url,
          { headers: {'Content-Type': 'application/json',"Authorization" : `Bearer ${this.token}`}
          }).then(response => (this.comments = response.data.comments));
    },

    addNewComment(){
      if (this.inputValue !== '') {
        axios.post(this.url,
            {
              'title':this.inputValue,
              'description': 'desc'
            },
            {
              headers: {"Authorization" : `Bearer ${this.token}`},
            }).then( response => ( alert("New comment added, id: " + response.data.comment.id), this.allComments() ) );
        this.inputValue = ''
      }
    },

    removeComment(idx){
      axios.delete(this.url + "/" + idx,
          {
            headers: {"Authorization" : `Bearer ${this.token}`},
          }).then( this.allComments() );
    },

    toUpperCase(item) {
      return item.toUpperCase()
    },
    removeNote(idx) {
      this.notes.splice(idx, 1)
    }
  },
  computed: {

  },
  watch: {
    inputValue(value) {
      if (value.length > 255) {
        this.inputValue = ''
      }
    }
  }
}

Vue.createApp(App).mount('#app')
