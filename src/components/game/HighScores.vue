<template>
    <div v-show="!getGameStatus" class="high-score">
        <h1>High Scores</h1>
        <table>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Sets</th>
                <th>Time</th>
                <th>Date</th>
            </tr>
            <tr>
                <td>1.</td>
                <td>Emile</td>
                <td>>9000</td>
                <td>>9000</td>
                <td>5</td>
                <td>2020-07-18</td>
            </tr>
            <tr>
                <td>2.</td>
                <td>Mr Fish</td>
                <td>1900</td>
                <td>154</td>
                <td>5</td>
                <td>2020-07-18</td>
            </tr>
            <tr>
                <td>3.</td>
                <td>Bear</td>
                <td>1500</td>
                <td>151</td>
                <td>5</td>
                <td>2020-07-18</td>
            </tr>
            <tr>
                <td>4.</td>
                <td>Jacques the Moose</td>
                <td>1337</td>
                <td>43</td>
                <td>5</td>
                <td>2020-07-18</td>
            </tr>
            <tr>
                <td>5.</td>
                <td>Big Papa Pump</td>
                <td>1250</td>
                <td>3</td>
                <td>10</td>
                <td>2020-07-18</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.high-score {
    width: 500px;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%, -10px);
    text-align: center;
}

</style>